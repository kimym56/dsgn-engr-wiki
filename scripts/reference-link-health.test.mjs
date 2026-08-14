import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  checkReferenceLinks,
  checkReferenceUrl,
  loadPublishedRecords,
  runReferenceLinkHealth,
} from "./reference-link-health.mjs";

const temporaryDirectories = [];

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map((directory) =>
      rm(directory, {
        recursive: true,
        force: true,
      }),
    ),
  );
});

const record = (id, url = `https://example.com/${id}`) => ({ id, url });

const response = (status, location) =>
  new Response(null, {
    status,
    headers: location ? { location } : undefined,
  });

describe("checkReferenceUrl", () => {
  it("reports a 2xx HEAD response as healthy", async () => {
    const calls = [];
    const fetchImpl = async (url, options) => {
      calls.push({ url, options });
      return response(204);
    };

    await expect(
      checkReferenceUrl(record("healthy"), { fetchImpl }),
    ).resolves.toEqual({
      id: "healthy",
      outcome: "healthy",
      httpStatus: 204,
      url: "https://example.com/healthy",
      detail: null,
    });
    expect(calls).toEqual([
      {
        url: "https://example.com/healthy",
        options: expect.objectContaining({
          method: "HEAD",
          redirect: "manual",
        }),
      },
    ]);
  });

  it("reports redirects with their first status and final resolved destination", async () => {
    const calls = [];
    const fetchImpl = async (url, options) => {
      calls.push({ url, method: options.method });
      if (url === "https://example.com/start") return response(301, "/middle");
      if (url === "https://example.com/middle") {
        return response(302, "https://other.example/final");
      }
      return response(200);
    };

    await expect(
      checkReferenceUrl(record("redirected", "https://example.com/start"), {
        fetchImpl,
      }),
    ).resolves.toEqual({
      id: "redirected",
      outcome: "redirect",
      httpStatus: 301,
      url: "https://other.example/final",
      detail: null,
    });
    expect(calls).toEqual([
      { url: "https://example.com/start", method: "HEAD" },
      { url: "https://example.com/middle", method: "HEAD" },
      { url: "https://other.example/final", method: "HEAD" },
    ]);
  });

  it("stops a redirect loop", async () => {
    const fetchImpl = async (url) =>
      url.endsWith("/a") ? response(302, "/b") : response(302, "/a");

    await expect(
      checkReferenceUrl(record("loop", "https://example.com/a"), {
        fetchImpl,
      }),
    ).resolves.toEqual({
      id: "loop",
      outcome: "unavailable",
      httpStatus: 302,
      url: "https://example.com/a",
      detail: "redirect loop",
    });
  });

  it("stops before following a sixth redirect", async () => {
    const calls = [];
    const fetchImpl = async (url) => {
      calls.push(url);
      const hop = Number(new URL(url).pathname.slice(1));
      return response(302, `/${hop + 1}`);
    };

    await expect(
      checkReferenceUrl(record("bounded", "https://example.com/0"), {
        fetchImpl,
      }),
    ).resolves.toEqual({
      id: "bounded",
      outcome: "unavailable",
      httpStatus: 302,
      url: "https://example.com/5",
      detail: "more than 5 redirects",
    });
    expect(calls).toHaveLength(6);
  });

  it.each([405, 501])(
    "retries HEAD status %i once with GET",
    async (status) => {
      const methods = [];
      const fetchImpl = async (_url, options) => {
        methods.push(options.method);
        return options.method === "HEAD" ? response(status) : response(200);
      };

      await expect(
        checkReferenceUrl(record(`fallback-${status}`), { fetchImpl }),
      ).resolves.toEqual({
        id: `fallback-${status}`,
        outcome: "healthy",
        httpStatus: 200,
        url: `https://example.com/fallback-${status}`,
        detail: null,
      });
      expect(methods).toEqual(["HEAD", "GET"]);
    },
  );

  it("cancels a GET fallback body without reading it", async () => {
    let cancelled = false;
    const body = new ReadableStream({
      cancel() {
        cancelled = true;
      },
    });
    const fetchImpl = async (_url, { method }) =>
      method === "HEAD" ? response(405) : new Response(body, { status: 200 });

    await checkReferenceUrl(record("bodyless"), { fetchImpl });

    expect(cancelled).toBe(true);
  });

  it("reports a network error without dropping its message", async () => {
    const fetchImpl = async () => {
      throw new Error("socket closed");
    };

    await expect(
      checkReferenceUrl(record("network-error"), { fetchImpl }),
    ).resolves.toEqual({
      id: "network-error",
      outcome: "unavailable",
      httpStatus: null,
      url: "https://example.com/network-error",
      detail: "socket closed",
    });
  });
});

describe("checkReferenceLinks", () => {
  it("keeps checking after a per-request timeout", async () => {
    const records = [record("slow"), record("available")];
    const fetchImpl = async (url, { signal }) => {
      if (url.endsWith("/available")) return response(200);

      return new Promise((_resolve, reject) => {
        signal.addEventListener("abort", () => reject(signal.reason), {
          once: true,
        });
      });
    };

    const report = await checkReferenceLinks(records, {
      fetchImpl,
      timeoutMs: 5,
      concurrency: 2,
    });

    expect(report.results).toEqual([
      {
        id: "slow",
        outcome: "unavailable",
        httpStatus: null,
        url: "https://example.com/slow",
        detail: "timeout",
      },
      {
        id: "available",
        outcome: "healthy",
        httpStatus: 200,
        url: "https://example.com/available",
        detail: null,
      },
    ]);
    expect(report.exitCode).toBe(1);
  });

  it("limits concurrency to four while preserving deterministic input order", async () => {
    const records = Array.from({ length: 9 }, (_, index) =>
      record(`record-${8 - index}`),
    );
    let active = 0;
    let maximumActive = 0;
    const fetchImpl = async () => {
      active += 1;
      maximumActive = Math.max(maximumActive, active);
      await new Promise((resolve) => setTimeout(resolve, 5));
      active -= 1;
      return response(200);
    };

    const report = await checkReferenceLinks(records, {
      fetchImpl,
      concurrency: 4,
    });

    expect(maximumActive).toBe(4);
    expect(report.results.map(({ id }) => id)).toEqual([
      "record-8",
      "record-7",
      "record-6",
      "record-5",
      "record-4",
      "record-3",
      "record-2",
      "record-1",
      "record-0",
    ]);
  });

  it("caps caller-supplied concurrency above four", async () => {
    const records = Array.from({ length: 9 }, (_, index) =>
      record(`over-limit-${index}`),
    );
    let active = 0;
    let maximumActive = 0;
    const fetchImpl = async () => {
      active += 1;
      maximumActive = Math.max(maximumActive, active);
      await new Promise((resolve) => setTimeout(resolve, 5));
      active -= 1;
      return response(200);
    };

    await checkReferenceLinks(records, {
      fetchImpl,
      concurrency: 9,
    });

    expect(maximumActive).toBe(4);
  });

  it("formats stable result lines and exits zero when nothing is unavailable", async () => {
    const records = [
      record("redirected", "https://example.com/start"),
      record("healthy"),
    ];
    const fetchImpl = async (url) => {
      if (url === "https://example.com/start") return response(301, "/final");
      return response(200);
    };

    const report = await checkReferenceLinks(records, { fetchImpl });

    expect(report.lines).toEqual([
      "REDIRECT  redirected  301  https://example.com/final",
      "HEALTHY  healthy  200  https://example.com/healthy",
      "TOTAL  2  HEALTHY  1  REDIRECT  1  UNAVAILABLE  0",
    ]);
    expect(report.totals).toEqual({
      healthy: 1,
      redirect: 1,
      unavailable: 0,
    });
    expect(report.exitCode).toBe(0);
  });

  it("exits nonzero only when at least one result is unavailable", async () => {
    const report = await checkReferenceLinks(
      [record("healthy"), record("missing")],
      {
        fetchImpl: async (url) =>
          url.endsWith("/missing") ? response(404) : response(200),
      },
    );

    expect(report.lines).toEqual([
      "HEALTHY  healthy  200  https://example.com/healthy",
      "UNAVAILABLE  missing  HTTP 404  https://example.com/missing",
      "TOTAL  2  HEALTHY  1  REDIRECT  0  UNAVAILABLE  1",
    ]);
    expect(report.exitCode).toBe(1);
  });
});

describe("runReferenceLinkHealth", () => {
  it.each([
    {
      label: "successful",
      status: 200,
      expectedExitCode: 0,
      expectedLine: "HEALTHY  source  200  https://example.com/source",
      expectedSummary: "TOTAL  1  HEALTHY  1  REDIRECT  0  UNAVAILABLE  0",
    },
    {
      label: "unavailable",
      status: 503,
      expectedExitCode: 1,
      expectedLine: "UNAVAILABLE  source  HTTP 503  https://example.com/source",
      expectedSummary: "TOTAL  1  HEALTHY  0  REDIRECT  0  UNAVAILABLE  1",
    },
  ])(
    "prints a $label report and assigns process exit code $expectedExitCode",
    async ({ status, expectedExitCode, expectedLine, expectedSummary }) => {
      const lines = [];
      const processLike = { exitCode: undefined };

      await runReferenceLinkHealth([record("source")], {
        fetchImpl: async () => response(status),
        writeLine: (line) => lines.push(line),
        processLike,
      });

      expect(lines).toEqual([expectedLine, expectedSummary]);
      expect(processLike.exitCode).toBe(expectedExitCode);
    },
  );
});

describe("loadPublishedRecords", () => {
  it("reads only published JSON records in deterministic filename order", async () => {
    const contentDirectory = await mkdtemp(
      path.join(os.tmpdir(), "reference-link-health-"),
    );
    temporaryDirectories.push(contentDirectory);
    await mkdir(path.join(contentDirectory, "ignored-directory"));
    await Promise.all([
      writeFile(
        path.join(contentDirectory, "z-review.json"),
        JSON.stringify({
          id: "z-review",
          url: "https://example.com/z-review",
          status: "review",
        }),
      ),
      writeFile(
        path.join(contentDirectory, "b-published.json"),
        JSON.stringify({
          id: "b-published",
          url: "https://example.com/b-published",
          status: "published",
        }),
      ),
      writeFile(
        path.join(contentDirectory, "a-published.json"),
        JSON.stringify({
          id: "a-published",
          url: "https://example.com/a-published",
          status: "published",
        }),
      ),
      writeFile(path.join(contentDirectory, "notes.txt"), "ignored"),
    ]);

    await expect(loadPublishedRecords(contentDirectory)).resolves.toEqual([
      {
        id: "a-published",
        url: "https://example.com/a-published",
      },
      {
        id: "b-published",
        url: "https://example.com/b-published",
      },
    ]);
  });
});

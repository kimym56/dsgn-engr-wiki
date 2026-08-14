import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const MAX_REDIRECTS = 5;
const MAX_CONCURRENCY = 4;
const DEFAULT_CONTENT_DIRECTORY = path.join(
  process.cwd(),
  "content",
  "references",
  "en",
);

const result = (record, outcome, httpStatus, url, detail = null) => ({
  id: record.id,
  outcome,
  httpStatus,
  url,
  detail,
});

const oneLine = (value) => value.replace(/\s+/g, " ").trim();

const errorDetail = (error) => {
  if (error?.name === "TimeoutError" || error?.name === "AbortError") {
    return "timeout";
  }

  return oneLine(error instanceof Error ? error.message : String(error));
};

async function requestHeaders(url, method, fetchImpl, timeoutMs) {
  const response = await fetchImpl(url, {
    method,
    redirect: "manual",
    signal: AbortSignal.timeout(timeoutMs),
  });
  await response.body?.cancel();
  return response;
}

export async function checkReferenceUrl(
  record,
  { fetchImpl = fetch, timeoutMs = 10000 } = {},
) {
  let currentUrl = record.url;
  let redirectCount = 0;
  let firstRedirectStatus = null;
  const visited = new Set([currentUrl]);

  while (true) {
    let response;

    try {
      response = await requestHeaders(currentUrl, "HEAD", fetchImpl, timeoutMs);
      if (response.status === 405 || response.status === 501) {
        response = await requestHeaders(
          currentUrl,
          "GET",
          fetchImpl,
          timeoutMs,
        );
      }
    } catch (error) {
      return result(
        record,
        "unavailable",
        null,
        currentUrl,
        errorDetail(error),
      );
    }

    if (response.status >= 200 && response.status < 300) {
      return result(
        record,
        firstRedirectStatus === null ? "healthy" : "redirect",
        firstRedirectStatus ?? response.status,
        currentUrl,
      );
    }

    if (response.status >= 300 && response.status < 400) {
      firstRedirectStatus ??= response.status;
      const location = response.headers.get("location");
      if (!location) {
        return result(
          record,
          "unavailable",
          response.status,
          currentUrl,
          "redirect missing location",
        );
      }

      if (redirectCount >= MAX_REDIRECTS) {
        return result(
          record,
          "unavailable",
          response.status,
          currentUrl,
          `more than ${MAX_REDIRECTS} redirects`,
        );
      }

      let nextUrl;
      try {
        nextUrl = new URL(location, currentUrl).href;
      } catch {
        return result(
          record,
          "unavailable",
          response.status,
          currentUrl,
          "invalid redirect location",
        );
      }

      if (visited.has(nextUrl)) {
        return result(
          record,
          "unavailable",
          response.status,
          nextUrl,
          "redirect loop",
        );
      }

      visited.add(nextUrl);
      currentUrl = nextUrl;
      redirectCount += 1;
      continue;
    }

    return result(
      record,
      "unavailable",
      response.status,
      currentUrl,
      `HTTP ${response.status}`,
    );
  }
}

const formatResult = (item) => {
  const label = item.outcome.toUpperCase();
  const status = item.outcome === "unavailable" ? item.detail : item.httpStatus;
  return `${label}  ${item.id}  ${status}  ${item.url}`;
};

export async function checkReferenceLinks(
  records,
  { fetchImpl = fetch, timeoutMs = 10000, concurrency = 4 } = {},
) {
  const results = new Array(records.length);
  const workerCount = Math.min(
    records.length,
    MAX_CONCURRENCY,
    Number.isInteger(concurrency) && concurrency > 0 ? concurrency : 1,
  );
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < records.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await checkReferenceUrl(records[index], {
        fetchImpl,
        timeoutMs,
      });
    }
  }

  await Promise.all(Array.from({ length: workerCount }, () => worker()));

  const totals = { healthy: 0, redirect: 0, unavailable: 0 };
  for (const item of results) totals[item.outcome] += 1;

  const lines = results.map(formatResult);
  lines.push(
    `TOTAL  ${results.length}  HEALTHY  ${totals.healthy}  REDIRECT  ${totals.redirect}  UNAVAILABLE  ${totals.unavailable}`,
  );

  return {
    results,
    totals,
    lines,
    exitCode: totals.unavailable > 0 ? 1 : 0,
  };
}

export async function runReferenceLinkHealth(
  records,
  {
    fetchImpl = fetch,
    timeoutMs = 10000,
    concurrency = 4,
    writeLine = console.log,
    processLike = process,
  } = {},
) {
  const report = await checkReferenceLinks(records, {
    fetchImpl,
    timeoutMs,
    concurrency,
  });
  for (const line of report.lines) writeLine(line);
  processLike.exitCode = report.exitCode;
  return report;
}

export async function loadPublishedRecords(
  contentDirectory = DEFAULT_CONTENT_DIRECTORY,
) {
  const filenames = (await readdir(contentDirectory))
    .filter((filename) => filename.endsWith(".json"))
    .sort();
  const records = await Promise.all(
    filenames.map(async (filename) => {
      const contents = await readFile(
        path.join(contentDirectory, filename),
        "utf8",
      );
      return JSON.parse(contents);
    }),
  );

  return records
    .filter(({ status }) => status === "published")
    .map(({ id, url }) => ({ id, url }));
}

async function main() {
  await runReferenceLinkHealth(await loadPublishedRecords());
}

const entryPath = process.argv[1]
  ? pathToFileURL(path.resolve(process.argv[1])).href
  : null;
if (entryPath === import.meta.url) {
  main().catch((error) => {
    console.error(`Reference link-health check failed: ${errorDetail(error)}`);
    process.exitCode = 1;
  });
}

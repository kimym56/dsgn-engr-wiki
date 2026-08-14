import {
  REFERENCE_FORMATS,
  type ReferenceCatalog,
  type ReferenceFormat,
  type ReferenceRecord,
} from "./reference-schema";

export interface ReferenceFilterState {
  area: string | null;
  format: ReferenceFormat | null;
  hasInvalidValue: boolean;
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function parseReferenceFilters(
  searchParams: Record<string, string | string[] | undefined>,
  catalog: Pick<ReferenceCatalog, "areas">,
): ReferenceFilterState {
  const area = firstValue(searchParams.area) || undefined;
  const format = firstValue(searchParams.format) || undefined;
  const isAreaValid =
    area === undefined || catalog.areas.some(({ id }) => id === area);
  const isFormatValid =
    format === undefined ||
    REFERENCE_FORMATS.some((referenceFormat) => referenceFormat === format);

  if (!isAreaValid || !isFormatValid) {
    return { area: null, format: null, hasInvalidValue: true };
  }

  return {
    area: area ?? null,
    format: (format as ReferenceFormat | undefined) ?? null,
    hasInvalidValue: false,
  };
}

export function filterReferences(
  records: ReferenceRecord[],
  filters: ReferenceFilterState,
): ReferenceRecord[] {
  return records.filter(
    (record) =>
      (filters.area === null || record.areas.includes(filters.area)) &&
      (filters.format === null || record.format === filters.format),
  );
}

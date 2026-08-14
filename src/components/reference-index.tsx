import {
  REFERENCE_FORMATS,
  type ReferenceArea,
  type ReferenceRecord,
} from "@/content/reference-schema";
import type { ReferenceFilterState } from "@/content/reference-filters";
import type { ReferencesCopy } from "@/i18n/dictionaries/types";
import { ReferenceCard } from "./reference-card";

interface ReferenceIndexProps {
  lang: string;
  records: ReferenceRecord[];
  areas: ReferenceArea[];
  filters: ReferenceFilterState;
  isReviewPreview: boolean;
  dictionary: ReferencesCopy;
}

export function ReferenceIndex({
  lang,
  records,
  areas,
  filters,
  isReviewPreview,
  dictionary,
}: ReferenceIndexProps) {
  const referencesPath = `/${lang}/references`;

  return (
    <div className="reference-index">
      {isReviewPreview ? (
        <p className="reference-index__preview-banner" role="note">
          {dictionary.previewBanner}
        </p>
      ) : null}
      <form
        action={referencesPath}
        aria-label={dictionary.applyFilters}
        className="reference-index__filters"
        method="get"
      >
        <label>
          <span>{dictionary.areaFilter}</span>
          <select defaultValue={filters.area ?? ""} name="area">
            <option value="">{dictionary.allAreas}</option>
            {areas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>{dictionary.formatFilter}</span>
          <select defaultValue={filters.format ?? ""} name="format">
            <option value="">{dictionary.allFormats}</option>
            {REFERENCE_FORMATS.map((format) => (
              <option key={format} value={format}>
                {dictionary.formats[format]}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">{dictionary.applyFilters}</button>
        <a href={referencesPath}>{dictionary.clearFilters}</a>
      </form>
      <p aria-live="polite" className="reference-index__count">
        {dictionary.count(records.length)}
      </p>
      {records.length > 0 ? (
        <div className="reference-index__grid">
          {records.map((record) => (
            <ReferenceCard
              areas={areas}
              dictionary={dictionary}
              key={record.id}
              record={record}
            />
          ))}
        </div>
      ) : (
        <div className="reference-index__empty-state">
          <p>{dictionary.noResults}</p>
        </div>
      )}
    </div>
  );
}

import type {
  ReferenceArea,
  ReferenceRecord,
} from "@/content/reference-schema";
import type { ReferencesCopy } from "@/i18n/dictionaries/types";

interface ReferenceCardProps {
  record: ReferenceRecord;
  areas: ReferenceArea[];
  dictionary: ReferencesCopy;
}

export function ReferenceCard({
  record,
  areas,
  dictionary,
}: ReferenceCardProps) {
  const recordAreas = record.areas
    .map((areaId) => areas.find(({ id }) => id === areaId))
    .filter((area): area is ReferenceArea => area !== undefined);

  return (
    <article className="reference-card">
      <div className="reference-card__preview">
        <span aria-hidden="true" className="reference-card__preview-mark" />
        <p>{dictionary.neutralPreview}</p>
      </div>
      <p className="reference-card__format">
        {dictionary.formats[record.format]}
      </p>
      <h2>
        <a className="reference-card__title" href={record.url}>
          {record.title}
        </a>
      </h2>
      <p className="reference-card__publisher">{record.publisher}</p>
      {record.author !== null ? (
        <p className="reference-card__author">{record.author}</p>
      ) : null}
      <p className="reference-card__summary">{record.summary}</p>
      <div className="reference-card__relevance">
        <h3>{dictionary.relevance}</h3>
        <p>{record.relevance}</p>
      </div>
      <ul aria-label="Areas" className="reference-card__areas">
        {recordAreas.map((area) => (
          <li key={area.id}>{area.label}</li>
        ))}
      </ul>
      <dl className="reference-card__metadata">
        <div>
          <dt>{dictionary.sourceLanguage}</dt>
          <dd>{record.source_language}</dd>
        </div>
        <div>
          <dt>{dictionary.reviewed}</dt>
          <dd>
            <time dateTime={record.reviewed}>{record.reviewed}</time>
          </dd>
        </div>
      </dl>
      <a className="reference-card__source" href={record.url}>
        {dictionary.visitSource}
      </a>
    </article>
  );
}

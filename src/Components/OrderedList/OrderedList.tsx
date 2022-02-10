import { ListedItem } from "..";
import "./styles.scss";

type Props<T> = {
  entries: T[];
  descriptionKey: keyof T;
  name: string;
};

export function OrderedList<T extends { id: number }>({
  entries,
  descriptionKey,
  name,
}: Props<T>) {
  const entriesCount = entries.length;
  return (
    <div className="ordered-list">
      <div className="list-header">
        <span className="title">{`${name}`}</span>
        <span className="count">
          {entriesCount > 0 ? `(${entriesCount})` : ""}
        </span>
      </div>
      {entries.map((entry: T, index) => (
        <ListedItem
          key={entry.id}
          id={index + 1}
          description={`${entry[descriptionKey]}`}
        />
      ))}
    </div>
  );
}

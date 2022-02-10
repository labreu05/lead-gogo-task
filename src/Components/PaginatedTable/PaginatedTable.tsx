import { useState } from "react";
import { Button, Table } from "antd";
import { useIsMobile } from "../../Hooks/useIsMobile";
import "./styles.scss";
import { ColumnType } from "antd/lib/table";

type Props<T> = {
  dataSource: T[];
  columns: ColumnType<T>[];
  loading: boolean;
  rowKey: string;
  entryDescription: string;
};

export function PaginatedTable<T extends Record<string, any>>({
  dataSource,
  columns,
  loading,
  rowKey,
  entryDescription,
}: Props<T>) {
  const totalEntries = dataSource.length;
  const [firstEntry, setFirstEntry] = useState(1);
  const [lastEntry, setLastEntry] = useState(10);
  const isMobile = useIsMobile();

  return (
    <div className="paginated-table">
      <div className="pagination-info">
        {totalEntries > 0 ? (
          <>
            Showing{" "}
            <span className="highlight">
              {firstEntry} to {lastEntry}
            </span>{" "}
            of <span className="highlight">{totalEntries}</span>{" "}
            {entryDescription}
          </>
        ) : (
          "No entries to show"
        )}
      </div>
      <Table<T>
        loading={loading}
        showHeader={!isMobile}
        dataSource={dataSource}
        columns={columns}
        rowKey={rowKey}
        rowClassName="paginated-table-row"
        pagination={{
          position: ["bottomLeft"],
          pageSize: 10,
          showSizeChanger: false,
          nextIcon: (
            <Button className="pagination-action">
              <span className="text">Next</span>
              <img
                src="icon_arrow_left_pagination.png"
                alt="call to action"
                height={14}
              />
            </Button>
          ),
          prevIcon: (
            <Button className="pagination-action">
              <img
                src="icon_arrow_right_pagination.png"
                alt="call to action"
                height={14}
              />
              <span className="text">Prev</span>
            </Button>
          ),
          onChange: (page: number, pageSize: number) => {
            let lastEntry, firstEntry;
            const currentTotal = page * pageSize;
            const items = totalEntries - currentTotal;

            if (items >= 0) {
              lastEntry = pageSize * page;
              firstEntry = lastEntry - pageSize + 1;
            } else {
              lastEntry = totalEntries;
              firstEntry = totalEntries - (totalEntries % 10) + 1;
            }

            setLastEntry(lastEntry);
            setFirstEntry(firstEntry);
          },
        }}
      />
    </div>
  );
}

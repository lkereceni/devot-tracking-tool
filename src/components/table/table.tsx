"use client";

import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable, DataTableValue } from "primereact/datatable";
import React, { ReactElement } from "react";

type TableProps<T> = {
  data: T[] | null;
  headerMapping?: Record<string, string>;
  actionsButtons?: ReactElement<typeof Button>[];
  loading?: boolean;
};

const Table = <T extends DataTableValue>({
  data,
  headerMapping,
  actionsButtons,
  loading,
}: TableProps<T>) => {
  const actions = (
    <div className="flex flex-row align-items-center justify-content-center gap-30px">
      {actionsButtons}
    </div>
  );

  const setHeader = (key: string) => {
    if (headerMapping === undefined) {
      return key.charAt(0).toUpperCase() + key.slice(1);
    }

    return headerMapping[key] || key.charAt(0).toUpperCase() + key.slice(1);
  };

  const columns =
    data === null
      ? []
      : Object.keys(data[0] || {}).map((key) => ({
          field: key,
          header: setHeader(key),
        }));

  return (
    <DataTable
      value={data ?? []}
      paginator
      rows={5}
      loading={loading}
      emptyMessage="No tasks found"
    >
      {columns.map((col) => (
        <Column key={col.field} field={col.field} header={col.header} />
      ))}
      {!actionsButtons ? null : (
        <Column body={actions} header="Actions" className="w-3rem" />
      )}
    </DataTable>
  );
};

export default Table;

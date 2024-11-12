import { Column } from "primereact/column";
import { DataTable, DataTableValue } from "primereact/datatable";
import React from "react";
import ActionsCell, { Action } from "./actions-cell";

type TableProps<T> = {
  data: T[];
  headerMapping?: Record<string, string>;
  loading?: boolean;
  actions?: (rowData: T) => Action[];
};

const Table = <T extends DataTableValue>({
  data,
  headerMapping,
  loading,
  actions,
}: TableProps<T>) => {
  const setHeader = (key: string) => {
    if (headerMapping === undefined) {
      return key.charAt(0).toUpperCase() + key.slice(1);
    }

    return headerMapping[key] || key.charAt(0).toUpperCase() + key.slice(1);
  };

  const columns = !data
    ? []
    : Object.keys(data[0] || {})
        .filter((key) => key !== "id")
        .map((key) => ({
          field: key,
          header: setHeader(key),
        }));

  return (
    <DataTable
      value={data}
      paginator
      rows={5}
      loading={loading}
      emptyMessage="No tasks found"
    >
      {columns.map((col) => (
        <Column key={col.field} field={col.field} header={col.header} />
      ))}
      {actions && (
        <Column
          header="Actions"
          body={(rowData) => {
            const rowActions = actions(rowData);
            return <ActionsCell actions={rowActions} />;
          }}
          className="w-3rem"
        />
      )}
    </DataTable>
  );
};

export default Table;

"use client";

import ITable, { TD, TR } from "@/components/table";
import ITableBody from "@/components/table/body";
import ITableHeader from "@/components/table/header";
import { components } from "@/libs/api/schema/core-services";
import { formatStandardTime } from "@/utils/parsing-time";

const tableHeaders = [
  'Tag Name',
  'Created By',
  'Created At',
];

export default function ModuleTagsTableView({
  datas
}: {
  datas: components["schemas"]["Tag"][];
}) {
  return (
    <ITable>
      <ITableHeader headers={tableHeaders} />
      <ITableBody>
        {datas.map((data, index) => (
          <TR key={index}>
            <TD>{data.name}</TD>
            <TD>{data.created_by.email}</TD>
            <TD>{formatStandardTime(data.created_at)}</TD>
          </TR>
        ))}
      </ITableBody>
    </ITable>
  )
}
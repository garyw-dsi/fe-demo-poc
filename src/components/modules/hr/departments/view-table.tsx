"use client"

import ITable, { TD, TR } from "@/components/table";
import ITableBody from "@/components/table/body";
import ITableHeader from "@/components/table/header";
import { components } from "@/libs/api/schema/uam";
import { formatStandardTime } from "@/utils/parsing-time";
import { useRouter } from "next/navigation";

const tableHeaders = [
  'Name',
  'Created By',
  'Created At',
];

export default function ModuleHRDepartmentTableView({
  datas
}: {
  datas: components["schemas"]["Group"][]
}) {
  const router = useRouter();
  return (
    <ITable>
      <ITableHeader headers={tableHeaders} />
      <ITableBody>
        {datas.map((data, index) => (
          <TR key={index}
            onClick={() => router.push(`/modules/hr/departments/detail/${data.pk}`)}
          >
            <TD>{data.name}</TD>
            <TD>{data.created_by?.first_name} {data.created_by?.last_name}</TD>
            <TD>{formatStandardTime(data.created_at)}</TD>
          </TR>
        ))}
      </ITableBody>
    </ITable>
  )
}
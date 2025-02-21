"use client";

import { useRouter } from "next/navigation";
import ITable, { TD, TR } from "@/components/table";
import ITableBody from "@/components/table/body";
import ITableHeader from "@/components/table/header";
import { formatStandardTime } from "@/utils/parsing-time";
import { Payroll } from "./type";
import { formatStdCurrency } from "@/utils/currency";

const tableHeaders = [
  'Batch Name',
  'Period Start',
  'Period End',
  'Total Salary',
  'Total Employee',
  'Status',
];

export default function ModuleHRPayrollTableView({
  datas
}: {
  datas: Payroll[]
}) {
  const router = useRouter();

  return (
    <ITable>
      <ITableHeader headers={tableHeaders} />
      <ITableBody>
        {datas.map((data, index) => {
          return (
            <TR key={index}
              onClick={() => router.push(`/modules/hr/payrolls/detail/${data.pk}`)}
            >
              <TD>{data.batches.name}</TD>
              <TD>{formatStandardTime(data.batches.period_start)}</TD>
              <TD>{formatStandardTime(data.batches.period_end)}</TD>
              <TD>
                {formatStdCurrency({ price: data.batches.total_salary, currencyISO: "IDR" })}
              </TD>
              <TD>{data.batches.total_employee}</TD>
              <TD>
                {data.batches.status}
              </TD>
            </TR>
          )
        })}
      </ITableBody>
    </ITable>
  )
}
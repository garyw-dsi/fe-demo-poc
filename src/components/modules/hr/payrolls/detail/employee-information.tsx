"use client"

import { Stack } from "@chakra-ui/react";
import ModuleHRPayrollFormLayout from "../layout"
import { PayrollDetail } from "../type";
import ITable, { TD, TR } from "@/components/table";
import ITableHeader from "@/components/table/header";
import ITableBody from "@/components/table/body";
import { useRouter } from "next/navigation";
import { formatStdCurrency } from "@/utils/currency";

const headers = [
  "No",
  "Name",
  "Department",
  "Basic Salary",
  "Bank Name",
  "Bank Number",
]

export default function ModuleHRPayrollEmployeeInformation({
  data
}: {
  data: PayrollDetail
}) {
  const router = useRouter()
  return (
    <ModuleHRPayrollFormLayout
      title="Employee Information"
    >
      <Stack spacing={5}>
        <ITable>
          <ITableHeader headers={headers} />
          <ITableBody>
            {data.employees.map((data, index) => (
              <TR key={index}
                onClick={() => router.push(`/modules/hr/employees/detail/${data.pk}`)}
              >
                <TD>{index + 1}</TD>
                <TD>{data.name}</TD>
                <TD>{data.department}</TD>
                <TD>
                  {formatStdCurrency({
                    price: data.salary_structure.basic_salary,
                    currencyISO: "IDR"
                  })}
                </TD>
                <TD>{data.bank.name}</TD>
                <TD>{data.bank.number}</TD>
              </TR>
            ))}
          </ITableBody>
        </ITable>
      </Stack>
    </ModuleHRPayrollFormLayout>
  )
}
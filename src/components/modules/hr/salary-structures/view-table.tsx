"use client";

import { useRouter } from "next/navigation";
import ITable, { TD, TR } from "@/components/table";
import ITableBody from "@/components/table/body";
import ITableHeader from "@/components/table/header";
import { Avatar, Flex } from "@chakra-ui/react";
import { SalaryStructure } from "./type";
import { formatStdCurrency } from "@/utils/currency";

const tableHeaders = [
  'Structure Name',
  'Department',
  'Basic Salary',
  'Employment Type',
  'Created By'
];

export default function ModuleHRSalaryStructureTableView({
  datas
}: {
  datas: SalaryStructure[];
}) {
  const router = useRouter();

  return (
    <ITable>
      <ITableHeader headers={tableHeaders} />
      <ITableBody>
        {datas.map((data, index) => {
          const createdBy = data.created_by?.first_name
            ? `${data.created_by.first_name} ${data.created_by.last_name}`
            : 'System';

          return (
            <TR key={index}
              onClick={() => router.push(`/modules/hr/salary-structures/detail/${data.pk}`)}
            >
              <TD>{data.name}</TD>
              <TD>{data.department.name}</TD>
              <TD>
                {formatStdCurrency({
                  price: data.basic_salary,
                  currencyISO: "IDR"
                })}
              </TD>
              <TD>{data.employment_type}</TD>
              <TD>
                <Flex align='center' gap={2}>
                  <Avatar
                    name={createdBy}
                    size={'xs'}
                    rounded={'sm'}
                    src={data.created_by?.image.url || undefined}
                  />
                  {createdBy}
                </Flex>
              </TD>
            </TR>
          )
        })}
      </ITableBody>
    </ITable>
  )
}
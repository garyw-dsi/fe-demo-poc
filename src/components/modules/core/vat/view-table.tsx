"use client";

import ITable, { TD, TR } from "@/components/table";
import ITableBody from "@/components/table/body";
import ITableHeader from "@/components/table/header";
import { components } from "@/libs/api/schema/core-services";
import { viewStandardVATRate } from "@/utils/vat";
import { Tag } from "@chakra-ui/react";

const tableHeaders = [
  'Name',
  'Country',
  'Rate'
];

export default function ModuleVatTableView({
  datas
}: {
  datas: components["schemas"]["VAT"][];
}) {
  return (
    <ITable>
      <ITableHeader headers={tableHeaders} />
      <ITableBody>
        {datas.map((data, index) => (
          <TR key={index}>
            <TD>{data.name}</TD>
            <TD>{data.country?.name}</TD>
            <TD>
              <Tag size={'sm'} colorScheme="teal">
                {viewStandardVATRate({ rate: data.rate })}
              </Tag>
            </TD>
          </TR>
        ))}
      </ITableBody>
    </ITable>
  )
}
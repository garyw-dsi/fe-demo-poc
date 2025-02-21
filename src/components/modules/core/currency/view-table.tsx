"use client";

import ITable, { TD, TR } from "@/components/table";
import ITableBody from "@/components/table/body";
import ITableHeader from "@/components/table/header";
import { components } from "@/libs/api/schema/core-services";
import { Tag } from "@chakra-ui/react";

const tableHeaders = [
  'Currency ISO',
  'Currency Name',
  'Currency Symbol',
  'Country',
];

export default function ModuleCurrencyTableView({
  datas
}: {
  datas: components["schemas"]["Currency"][];
}) {
  return (
    <ITable>
      <ITableHeader headers={tableHeaders} />
      <ITableBody>
        {datas.map((data, index) => (
          <TR key={index}>
            <TD>{data.iso}</TD>
            <TD>{data.name}</TD>
            <TD>
              <Tag size={'sm'} colorScheme="teal">
                {data.symbol}
              </Tag>
            </TD>
            <TD>{data.country?.name}</TD>
          </TR>
        ))}
      </ITableBody>
    </ITable>
  )
}
"use client";

import { useRouter } from "next/navigation";
import ITable, { TD, TR } from "@/components/table";
import ITableBody from "@/components/table/body";
import ITableHeader from "@/components/table/header";
import { components } from "@/libs/api/schema/inventory";
import { formatStandardTime } from "@/utils/parsing-time";
import { Avatar, Flex } from "@chakra-ui/react";

const tableHeaders = [
  'Category Name',
  'Income Account',
  'Expense Account',
  'Created By',
  'Created At',
];

export default function ModuleInventoryProductCategoryTableView({
  datas
}: {
  datas: components["schemas"]["ProductCategory"][];
}) {
  const router = useRouter();

  return (
    <ITable>
      <ITableHeader headers={tableHeaders} />
      <ITableBody>
        {datas.map((data, index) => {
          const createdBy = `${data.created_by.first_name} ${data.created_by.last_name}`;
          return (
            <TR key={index}
              onClick={() => router.push(`/modules/inventory/products/category/detail/${data.pk}`)}
            >
              <TD>{data.name}</TD>
              <TD>{data.income_account.name}</TD>
              <TD>{data.expense_account.name}</TD>
              <TD>
                <Flex align={'center'} gap={2}>
                  <Avatar
                    size={'xs'}
                    rounded={'sm'}
                    src={data.created_by.image.url || undefined}
                    name={createdBy}
                  />
                  {createdBy}
                </Flex>
              </TD>
              <TD>{formatStandardTime(data.created_at)}</TD>
            </TR>
          )
        })}
      </ITableBody>
    </ITable>
  )
}
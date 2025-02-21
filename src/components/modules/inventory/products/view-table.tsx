"use client";

import { useRouter } from "next/navigation";
import ITable, { TD, TR } from "@/components/table";
import ITableBody from "@/components/table/body";
import ITableHeader from "@/components/table/header";
import { components } from "@/libs/api/schema/inventory";
import { formatStandardTime } from "@/utils/parsing-time";
import { Flex, Tag } from "@chakra-ui/react";
import { formatStdCurrency } from "@/utils/currency";

const tableHeaders = [
  'Name',
  'Tags',
  'Unit',
  'Category',
  'Price',
  'Type',
  'Created At',
];

export default function ModuleInventoryProductTableView({
  datas
}: {
  datas: components["schemas"]["Product"][];
}) {
  const router = useRouter();

  return (
    <ITable>
      <ITableHeader headers={tableHeaders} />
      <ITableBody>
        {datas.map((data, index) => (
          <TR key={index}
            onClick={() => router.push(`/modules/inventory/products/detail/${data.pk}`)}
          >
            <TD>{data.name}</TD>
            <TD>
              <Flex align={'center'} gap={2}>
                {data.tags?.map((tag, index) => (
                  <Tag key={index}
                    colorScheme="teal"
                    size={'sm'}
                    fontSize={'xs'}
                  >
                    {tag.name}
                  </Tag>
                ))}
              </Flex>
            </TD>
            <TD>{data.unit}</TD>
            <TD>{data.product_category.name}</TD>
            <TD>
              {formatStdCurrency({
                currencyISO: data.currency.iso,
                price: Number(data.price) || 0
              })}
            </TD>
            <TD>{data.product_type}</TD>
            <TD>{formatStandardTime(data.created_at)}</TD>
          </TR>
        ))}
      </ITableBody>
    </ITable>
  )
}
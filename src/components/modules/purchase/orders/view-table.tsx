"use client";

import { useRouter } from "next/navigation";
import ITable, { TD, TR } from "@/components/table";
import ITableBody from "@/components/table/body";
import ITableHeader from "@/components/table/header";
import { formatStandardTime } from "@/utils/parsing-time";
import { Avatar, Flex, Tag, Text } from "@chakra-ui/react";
import { handleStatusInfo } from "./status";
import { components } from "@/libs/api/schema/sales";

const tableHeaders = [
  'Vendor',
  'Lead',
  'Total',
  'Status',
  'Created At',
];

type Data = components['schemas']['Order'];

export default function ModulePurchaseOrdersTableView({
  datas
}: {
  datas: Data[];
}) {
  const router = useRouter();

  return (
    <ITable>
      <ITableHeader headers={tableHeaders} />
      <ITableBody>
        {datas.map((data, index) => {
          const { color, text } = handleStatusInfo(data.status);
          return (
            <TR key={index}
              onClick={() => router.push(`/modules/purchase/orders/detail/${data.pk}`)}
            >
              <TD>
                <Flex gap={2} align={'center'}>
                  <Avatar size={'xs'} rounded={'sm'} name={data.quotation?.customer.contact.name} />
                  <Text>
                    {data.quotation?.customer.contact.name}
                  </Text>
                </Flex>
              </TD>
              <TD>{data.quotation?.lead?.name}</TD>
              <TD>
                {Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR'
                }).format(Number(data.total))}
              </TD>
              <TD>
                <Tag colorScheme={color} size={'sm'} fontSize={'xs'}>
                  {text}
                </Tag>
              </TD>
              <TD>{formatStandardTime(data.created_at)}</TD>
            </TR>
          )
        })}
      </ITableBody>
    </ITable>
  )
}
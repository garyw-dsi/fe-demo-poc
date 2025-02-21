"use client";

import { useRouter } from "next/navigation";
import ITable, { TD, TR } from "@/components/table";
import ITableBody from "@/components/table/body";
import ITableHeader from "@/components/table/header";
import { formatStandardTime } from "@/utils/parsing-time";
import { Avatar, Flex, Tag, Text } from "@chakra-ui/react";
import { handleStatusInfo } from "@/components/modules/sales/status";
import { components } from "@/libs/api/schema/sales";

const tableHeaders = [
  "Order ID",
  'Customer',
  'Total',
  'Status',
  'Created By',
  'Created At',
];

export default function ModuleSalesOrdersTableView({
  datas
}: {
  datas: components['schemas']['OrderList'][];
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
              onClick={() => router.push(`/modules/sales/orders/detail/${data.pk}`)}
            >
              <TD>
                {data.order_id}
              </TD>
              <TD>
                {data.customer && (
                  <Flex gap={2} align={'center'}>
                    <Avatar
                      size={'xs'}
                      rounded={'sm'}
                      src={data.customer.contact.image.url || ''}
                      name={data.customer.contact.name}
                    />
                    <Text>
                      {data.customer.contact.name}
                    </Text>
                  </Flex>
                )}
              </TD>
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
              <TD>
                <Flex gap={2} align={'center'}>
                  <Avatar
                    size={'xs'}
                    rounded={'sm'}
                    name={`${data.created_by.first_name} ${data.created_by.last_name}`}
                  />
                  <Text>
                    {`${data.created_by.first_name} ${data.created_by.last_name}`}
                  </Text>
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
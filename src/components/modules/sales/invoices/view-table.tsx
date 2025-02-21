"use client";

import { useRouter } from "next/navigation";
import ITable, { TD, TR } from "@/components/table";
import ITableBody from "@/components/table/body";
import ITableHeader from "@/components/table/header";
import { formatStandardTime } from "@/utils/parsing-time";
import { Avatar, Flex, Tag, Text } from "@chakra-ui/react";
import { components } from "@/libs/api/schema/sales";
import { handleStatusInvoiceInfo } from "../status";

const tableHeaders = [
  'Invoice No',
  'Customer',
  'Total',
  'Status',
  'Created By',
  'Created At',
];

export default function ModuleSalesInvoicesTableView({
  datas
}: {
  datas: components['schemas']['InvoiceList'][];
}) {
  const router = useRouter();

  return (
    <ITable>
      <ITableHeader headers={tableHeaders} />
      <ITableBody>
        {datas.map((data, index) => {
          const { color, text } = handleStatusInvoiceInfo(data.status);
          const name = `${data.created_by.first_name} ${data.created_by.last_name}`;
          return (
            <TR key={index}
              onClick={() => router.push(`/modules/sales/invoices/detail/${data.pk}`)}
            >
              <TD>
                {data.invoice_id}
              </TD>
              <TD>
                {data.order?.quotation && (
                  <Flex gap={2} align={'center'}>
                    <Avatar
                      size={'xs'}
                      rounded={'sm'}
                      src={data.order.quotation?.customer.contact.image.url || ''}
                      name={data.order.quotation?.customer.contact.name}
                    />
                    <Text>
                      {data.order.quotation?.customer.contact.name}
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
                    name={name}
                  />
                  <Text>
                    {name}
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
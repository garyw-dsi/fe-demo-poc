"use client";

import { useRouter } from "next/navigation";
import ITable, { TD, TR } from "@/components/table";
import ITableBody from "@/components/table/body";
import ITableHeader from "@/components/table/header";
import { formatStandardTime } from "@/utils/parsing-time";
import { Avatar, Flex, Text } from "@chakra-ui/react";
import { components } from "@/libs/api/schema/sales";

const tableHeaders = [
  'Invoice No',
  'Created By',
  'Total',
  'Created At',
];

export default function ModulePurchaseInvoicesTableView({
  datas
}: {
  datas: components['schemas']['Invoice'][];
}) {
  const router = useRouter();

  return (
    <ITable>
      <ITableHeader headers={tableHeaders} />
      <ITableBody>
        {datas.map((data, index) => {
          const name = `${data.created_by.first_name} ${data.created_by.last_name}`;
          return (
            <TR key={index}
              onClick={() => router.push(`/modules/purchase/invoices/detail/${data.pk}`)}
            >
              <TD>
                {`INV-PRCH-${data.pk}`}
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
              <TD>
                {Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR'
                }).format(Number(data.total))}
              </TD>
              <TD>{formatStandardTime(data.created_at)}</TD>
            </TR>
          )
        })}
      </ITableBody>
    </ITable>
  )
}
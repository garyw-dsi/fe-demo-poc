"use client";

import { useRouter } from "next/navigation";
import ITable, { TD, TR } from "@/components/table";
import ITableBody from "@/components/table/body";
import ITableHeader from "@/components/table/header";
import { formatStandardDate } from "@/utils/parsing-time";
import { Avatar, Flex, Tag } from "@chakra-ui/react";
import { CustomerTransactionView } from "./type";
import { formatStdCurrency } from "@/utils/currency";

const tableHeaders = [
  "Number",
  "Date",
  "Journal",
  "Payment Method",
  "Customer",
  "Amount",
  "Amount Company Currency",
  "Status",
];

export default function ModuleAccountingCustomersTableView({
  datas
}: {
  datas: CustomerTransactionView[];
}) {
  const router = useRouter();

  return (
    <ITable>
      <ITableHeader headers={tableHeaders} />
      <ITableBody>
        {datas.map((data, index) => (
          <TR key={index}
            onClick={() => router.push(`/modules/accounting/customers/detail/${data.pk}`)}
          >
            <TD>{data.number}</TD>
            <TD>{formatStandardDate(data.date)}</TD>
            <TD>
              <Tag
                colorScheme={['red', 'orange', 'yellow', 'green', 'teal', 'blue', 'purple'][Math.floor(Math.random() * 7)]}
                fontSize={'xs'}
                size={'sm'}
              >
                {data.journal}
              </Tag>
            </TD>
            <TD>
              <Tag
                colorScheme={['red', 'orange', 'yellow', 'green', 'teal', 'blue', 'purple'][Math.floor(Math.random() * 7)]}
                fontSize={'xs'}
                size={'sm'}
              >
                {data.payment_method}
              </Tag>
            </TD>
            <TD>
              <Flex align={'center'} gap={2}>
                <Avatar
                  size={'xs'}
                  rounded={'sm'}
                  src={data.customer.image.url || undefined}
                  name={data.customer.name}
                />
                {data.customer.name}
              </Flex>
            </TD>
            <TD>
              {formatStdCurrency({
                price: data.amount,
                currencyISO: data.currency
              })}
            </TD>
            <TD>
              {formatStdCurrency({
                price: data.amount_company_currency,
                currencyISO: data.currency
              })}
            </TD>
            <TD>
              <Tag
                fontSize={'xs'}
                size={'sm'}
                colorScheme={
                  data.status === "Drafted"
                    ? "gray"
                    : data.status === "Posted"
                      ? "green"
                      : "red"
                }
              >
                {data.status}
              </Tag>
            </TD>
          </TR>
        ))}
      </ITableBody>
    </ITable>
  )
}
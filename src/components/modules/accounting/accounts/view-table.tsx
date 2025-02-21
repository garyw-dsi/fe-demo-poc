"use client";

import { useRouter } from "next/navigation";
import ITable, { TD, TR } from "@/components/table";
import ITableBody from "@/components/table/body";
import ITableHeader from "@/components/table/header";
import { components } from "@/libs/api/schema/accounting";
import { formatStandardTime } from "@/utils/parsing-time";
import { Avatar, Flex } from "@chakra-ui/react";
import { formatStdCurrency } from "@/utils/currency";

const tableHeaders = [
  'Account Number',
  'Account Name',
  'Account Type',
  'Balance',
  'Created By',
  'Created At',
];

export default function ModuleAccountingAccountsTableView({
  datas
}: {
  datas: components["schemas"]["Account"][];
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
              onClick={() => router.push(`/modules/accounting/accounts/detail/${data.pk}`)}
            >
              <TD>{data.account_number}</TD>
              <TD>
                <Flex align={'center'} gap={2}>
                  <Avatar
                    size={'xs'}
                    rounded={'sm'}
                    name={data.name}
                  />
                  {data.name}
                </Flex>
              </TD>
              <TD>{data.account_type}</TD>
              <TD>
                {formatStdCurrency({
                  currencyISO: data.currency.iso,
                  price: Number(data.balance)
                })}
              </TD>
              <TD>
                <Flex align={'center'} gap={2}>
                  <Avatar
                    size={'xs'}
                    rounded={'sm'}
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
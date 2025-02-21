"use client";

import { useRouter } from "next/navigation";
import ITable, { TD, TR } from "@/components/table";
import ITableBody from "@/components/table/body";
import ITableHeader from "@/components/table/header";
import { Tag } from "@chakra-ui/react";
import { formatStandardTime } from "@/utils/parsing-time";
import { formatStdCurrency } from "@/utils/currency";

const tableHeaders = [
  'Entry ID',
  'Journal Type',
  'Reference',
  'Date',
  'Debit',
  'Credit',
];


interface JournalItems {
  number: string;
  name: string;
  debit: number;
  credit: number;
}

interface Data {
  pk: number;
  entry_id: string;
  type: string;
  reference: {
    pk: number;
    entry_id: string;
  };
  date: string;
  currency: string;
  items: JournalItems[];
  total_debit: number;
  total_credit: number;
}

export default function ModuleAccountingJournalsTableView({
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
          const isDebitLarger = data.total_debit > data.total_credit;
          const isCreditLarger = data.total_credit > data.total_debit;

          return (
            <TR key={index}
              onClick={() => router.push(`/modules/accounting/journals/detail/${data.pk}`)}
            >
              <TD>{data.entry_id}</TD>
              <TD>
                <Tag
                  colorScheme={['red', 'orange', 'yellow', 'green', 'teal', 'blue', 'purple'][Math.floor(Math.random() * 7)]}
                  fontSize={'xs'}
                  size={'sm'}
                >
                  {data.type}
                </Tag>
              </TD>
              <TD>{data.reference.entry_id}</TD>
              <TD>{formatStandardTime(data.date)}</TD>
              <TD>
                <Tag
                  fontSize={'xs'}
                  size={'sm'}
                  colorScheme={isDebitLarger ? 'red' : isCreditLarger ? 'green' : 'gray'}
                >
                  {formatStdCurrency({
                    price: data.total_debit,
                    currencyISO: data.currency
                  })}
                </Tag>
              </TD>
              <TD>
                <Tag
                  fontSize={'xs'}
                  size={'sm'}
                  colorScheme={isDebitLarger ? 'red' : isCreditLarger ? 'green' : 'gray'}
                >
                  {formatStdCurrency({
                    price: data.total_credit,
                    currencyISO: data.currency
                  })}
                </Tag>
              </TD>
            </TR>
          )
        })}
      </ITableBody>
    </ITable>
  )
}
"use client"

import { Stack } from "@chakra-ui/react";
import ModuleAccountingJournalFormLayout from "../layout";
import ITable, { TD, TR } from "@/components/table";
import ITableHeader from "@/components/table/header";
import ITableBody from "@/components/table/body";
import { formatStdCurrency } from "@/utils/currency";


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
  last_modified_at: string,
  last_modified_by: {
    pk: number,
    email: string,
    first_name: string,
    last_name: string
  },
  created_at: string,
  created_by: {
    pk: number,
    email: string,
    first_name: string,
    last_name: string
  }
}

export default function ModuleAccountingJournalItemsDetail({
  data
}: {
  data: Data
}) {
  return (
    <ModuleAccountingJournalFormLayout title="Journal Items">
      <Stack spacing={5}>
        <ITable>
          <ITableHeader headers={['Account Number', 'Account Name', 'Debit', 'Credit']} />
          <ITableBody>
            {data.items.map((item, index) => (
              <TR key={index}>
                <TD>{item.number}</TD>
                <TD>{item.name}</TD>
                <TD>
                  {formatStdCurrency({
                    price: item.debit,
                    currencyISO: data.currency
                  })}
                </TD>
                <TD>
                  {formatStdCurrency({
                    price: item.credit,
                    currencyISO: data.currency
                  })}
                </TD>
              </TR>
            ))}
            <TR>
              <TD py={5} colSpan={2} textAlign="center" fontWeight={'bold'}>
                Total
              </TD>
              <TD fontWeight={'bold'}>
                {formatStdCurrency({
                  price: data.total_debit,
                  currencyISO: data.currency
                })}
              </TD>
              <TD fontWeight={'bold'}>
                {formatStdCurrency({
                  price: data.total_credit,
                  currencyISO: data.currency
                })}
              </TD>
            </TR>
          </ITableBody>
        </ITable>
      </Stack>
    </ModuleAccountingJournalFormLayout>
  )
}
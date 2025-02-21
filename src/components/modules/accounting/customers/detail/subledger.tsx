"use client"

import { Tag } from "@chakra-ui/react"
import ITable, { TD, TR } from "@/components/table"
import ModuleAccountingCustomerFormLayout from "../layout"
import { SubLedger } from "./type.static"
import ITableHeader from "@/components/table/header"
import ITableBody from "@/components/table/body"
import { formatStandardDate } from "@/utils/parsing-time"
import { formatStdCurrency } from "@/utils/currency"
import ModuleAccountingCustomerDetailAction from "./action"

const tableHeaders = [
  "Journal", "Account Number", "Account Name", "Invoice Date",
  "Due Date", "Year", "Debit", "Credit", "Balance"
];

export default function ModuleAccountingCustomerSubLedgerDetail({
  subLedgers
}: {
  subLedgers: SubLedger[]
}) {
  return (
    <ModuleAccountingCustomerFormLayout
      title="Sub Ledger"
      action={
        <ModuleAccountingCustomerDetailAction
          href="/modules/accounting/customers/create/subledger"
          title="Create Sub Ledger"
        />
      }
    >
      <ITable>
        <ITableHeader headers={tableHeaders} />
        <ITableBody>
          {subLedgers.map((ledger, index) => (
            <TR key={index}>
              <TD>
                <Tag
                  colorScheme={['red', 'orange', 'yellow', 'green', 'teal', 'blue', 'purple'][Math.floor(Math.random() * 7)]}
                  fontSize={'xs'}
                  size={'sm'}
                >
                  {ledger.journal}
                </Tag>
              </TD>
              <TD>{ledger.account_number}</TD>
              <TD>{ledger.account_name}</TD>
              <TD>{formatStandardDate(ledger.invoice_date)}</TD>
              <TD>{formatStandardDate(ledger.due_date)}</TD>
              <TD>{ledger.year}</TD>
              <TD>
                {formatStdCurrency({
                  price: ledger.debit,
                  currencyISO: "IDR"
                })}
              </TD>
              <TD>
                {formatStdCurrency({
                  price: ledger.credit,
                  currencyISO: "IDR"
                })}
              </TD>
              <TD>
                {formatStdCurrency({
                  price: ledger.balance,
                  currencyISO: "IDR"
                })}
              </TD>
            </TR>
          ))}
        </ITableBody>
      </ITable>
    </ModuleAccountingCustomerFormLayout>
  )
} 
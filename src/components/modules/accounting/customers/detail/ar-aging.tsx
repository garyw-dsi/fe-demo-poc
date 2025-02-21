"use client";

import ITable, { TD, TR } from "@/components/table";
import ModuleAccountingCustomerFormLayout from "../layout";
import { Aging, Bucket } from "./type.static";
import ITableHeader from "@/components/table/header";
import ITableBody from "@/components/table/body";
import { formatStandardDate } from "@/utils/parsing-time";
import { formatStdCurrency } from "@/utils/currency";
import ModuleAccountingCustomerDetailAction from "./action";

const tableHeaders = [
  "Invoice Date",
  "Invoice Number",
  "Currency",
  "Amount in Original Currency",
  "Amount in Reporting Currency",
  "Payment Terms",
  "Not Past Due",
  "1-30 Days",
  "31-60 Days",
  "61-90 Days",
  "More than 90 Days",
  "Total",
];

const formatBucketAmount = (bucket: Bucket[], name: Bucket['name']) => {
  const amount = bucket.find((b) => b.name === name)?.amount || 0;
  return amount ? formatStdCurrency({ price: amount, currencyISO: "IDR" }) : "-";
};

const bucketName: Bucket['name'][] = [
  "Not Past Due",
  "1-30 Days",
  "31-60 Days",
  "61-90 Days",
  "More than 90 Days",
]

export default function ModuleAccountingCustomerAgingDetail({
  agings
}: {
  agings: Aging[]
}) {
  return (
    <ModuleAccountingCustomerFormLayout
      title="AR Aging"
      action={
        <ModuleAccountingCustomerDetailAction
          href="/modules/accounting/customers/create/aging"
          title="Create Aging"
        />
      }
    >
      <ITable>
        <ITableHeader headers={tableHeaders} />
        <ITableBody>
          {agings.map((aging, index) => (
            <TR key={index}>
              <TD>{formatStandardDate(aging.invoice_date)}</TD>
              <TD>{aging.invoice_number}</TD>
              <TD>{aging.currency}</TD>
              <TD>
                {formatStdCurrency({
                  price: aging.amount_in_original_currency,
                  currencyISO: "IDR",
                })}
              </TD>
              <TD>
                {formatStdCurrency({
                  price: aging.amount_in_reporting_currency,
                  currencyISO: "IDR",
                })}
              </TD>
              <TD>{aging.payment_terms}</TD>
              {bucketName.map((bucketName) => (
                <TD key={bucketName}>{formatBucketAmount(aging.bucket, bucketName)}</TD>
              ))}
              <TD>
                {formatStdCurrency({
                  price: aging.bucket.reduce((acc, cur) => acc + (cur.amount || 0), 0),
                  currencyISO: "IDR",
                })}
              </TD>
            </TR>
          ))}
        </ITableBody>
      </ITable>
    </ModuleAccountingCustomerFormLayout>
  );
}
"use client";

import { Tag } from "@chakra-ui/react";
import ITable, { TD, TR } from "@/components/table";
import ModuleAccountingCustomerFormLayout from "../layout";
import { PaymentHistory } from "./type.static";
import ITableHeader from "@/components/table/header";
import ITableBody from "@/components/table/body";
import { formatStandardDate } from "@/utils/parsing-time";
import { formatStdCurrency } from "@/utils/currency";
import ModuleAccountingCustomerDetailAction from "./action";

const tableHeaders = [
  "Date",
  "Number",
  "Journal",
  "Payment Method",
  "Amount",
  "Amount (Company Currency)",
  "Status",
];

const randomColorScheme = () => {
  const colorSchemes = ["red", "orange", "yellow", "green", "teal", "blue", "purple"];
  return colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
};

const getStatusColorScheme = (status: string) => {
  switch (status) {
    case "Drafted":
      return "gray";
    case "Posted":
      return "green";
    default:
      return "red";
  }
};

export default function ModuleAccountingCustomerPaymentDetail({
  payments,
}: {
  payments: PaymentHistory[];
}) {
  return (
    <ModuleAccountingCustomerFormLayout
      title="History Payment"
      action={
        <ModuleAccountingCustomerDetailAction
          href="/modules/accounting/customers/create/payment"
          title="Create Payment"
        />
      }
    >
      <ITable>
        <ITableHeader headers={tableHeaders} />
        <ITableBody>
          {payments.map((payment, index) => (
            <TR key={index}>
              <TD>{payment.number}</TD>
              <TD>{formatStandardDate(payment.date)}</TD>
              <TD>
                <Tag colorScheme={randomColorScheme()} fontSize="xs" size="sm">
                  {payment.journal}
                </Tag>
              </TD>
              <TD>
                <Tag colorScheme={randomColorScheme()} fontSize="xs" size="sm">
                  {payment.payment_method}
                </Tag>
              </TD>
              <TD>
                {formatStdCurrency({
                  price: payment.amount,
                  currencyISO: "IDR",
                })}
              </TD>
              <TD>
                {formatStdCurrency({
                  price: payment.amount_company_currency,
                  currencyISO: "IDR",
                })}
              </TD>
              <TD>
                <Tag fontSize="xs" size="sm" colorScheme={getStatusColorScheme(payment.status)}>
                  {payment.status}
                </Tag>
              </TD>
            </TR>
          ))}
        </ITableBody>
      </ITable>
    </ModuleAccountingCustomerFormLayout>
  );
}

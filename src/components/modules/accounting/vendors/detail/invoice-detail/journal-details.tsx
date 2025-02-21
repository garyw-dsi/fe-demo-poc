"use client";

import ITable, { TD, TR } from "@/components/table";
import ITableBody from "@/components/table/body";
import ITableHeader from "@/components/table/header";
import { JournalDetails } from "../type.static";
import ModuleAccountingVendorFormLayout from "../../layout";

const tableHeaders = [
  "Account Number",
  "Account Name",
  "Debit",
  "Credit",
];

export default function ModuleAccountingVendorJournalDetail({
  datas,
}: {
  datas: JournalDetails[];
}) {
  return (
    <ModuleAccountingVendorFormLayout title="Accounting Journal Detail">
      <ITable>
        <ITableHeader headers={tableHeaders} />
        <ITableBody>
          {datas.map((data, index) => (
            <TR key={index}>
              <TD>{data.account_number}</TD>
              <TD>{data.account_name}</TD>
              <TD>
                {Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(Number(data.debit))}
              </TD>
              <TD>
                {Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(Number(data.credit))}
              </TD>
            </TR>
          ))}
        </ITableBody>
      </ITable>
    </ModuleAccountingVendorFormLayout>
  )
}

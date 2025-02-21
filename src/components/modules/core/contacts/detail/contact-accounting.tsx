"use client"

import ITable, { TD, TR } from "@/components/table";
import ModuleContactFormLayout from "../layout"
import { Stack, Text } from "@chakra-ui/react";
import ITableHeader from "@/components/table/header";
import ITableBody from "@/components/table/body";

type subModule = "Contact" | "Customer" | "Vendor";

interface Accounting {
  bank: {
    number: string;
    name: string;
  }[];
}

interface Props {
  subModule?: subModule;
  accounting: Accounting;
}

interface Title {
  subModule: subModule;
  title: string;
}

const titles: Title[] = [
  { subModule: "Contact", title: "Contact Accounting" },
  { subModule: "Customer", title: "Customer Accounting" },
  { subModule: "Vendor", title: "Vendor Accounting" }
];

export default function ModuleContactAccountingDetail({
  subModule = "Contact",
  accounting
}: Props) {
  return (
    <ModuleContactFormLayout
      title={
        titles
          .find((t) => t.subModule === subModule)?.title || ""
      }
    >
      <Stack spacing={5}>
        <Text fontSize={'sm'} fontWeight={'semibold'}>
          Bank Details
        </Text>
        <ITable>
          <ITableHeader headers={['No', 'Bank Name', 'Bank Number']} />
          <ITableBody>
            {accounting.bank.map((bank, index) => (
              <TR key={index}>
                <TD>{index + 1}</TD>
                <TD>{bank.name}</TD>
                <TD>{bank.number}</TD>
              </TR>
            ))}
          </ITableBody>
        </ITable>
      </Stack>
    </ModuleContactFormLayout>
  )
}
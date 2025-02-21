"use client"

import { Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import ModuleAccountingCustomerFormLayout from "../../layout"
import { Invoice } from "../type.static"
import { formatStandardDate } from "@/utils/parsing-time";
import ModuleAccountingCustomerInvoiceDetailTabs from "./tab";
import ModuleAccountingCustomerOrderDetail from "./order-details";
import ModuleAccountingCustomerJournalDetail from "./journal-details";
import ModuleAccountingCustomerDetailAction from "../action";


interface ViewDataProps {
  label: string;
  value: string | number;
}

const ViewData = ({ label, value }: ViewDataProps) => (
  <Stack spacing={0}>
    <Text fontSize="xs" color={useColorModeValue("gray.500", "gray.300")}>
      {label}
    </Text>
    <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
      {value}
    </Text>
  </Stack>
);

export default function ModuleAccountingCustomerInvoiceDetail({
  invoices
}: {
  invoices: Invoice
}) {
  return (
    <Stack spacing={5}>
      <ModuleAccountingCustomerFormLayout title="Detail Invoice"
        action={
          <ModuleAccountingCustomerDetailAction
            title="Create Invoice"
            href="/modules/sales/invoices/create"
          />
        }
      >
        <Stack spacing={5}>
          <Flex justify={'space-between'}>
            <Flex w={'50%'} direction={'column'}>
              <ViewData label="Customer Invoice ID" value={invoices.customer.invoice_id} />
            </Flex>
            <Flex w={'50%'}>
              <ViewData label="Sales Order ID" value={invoices.sales_order_id} />
            </Flex>
          </Flex>
          <Flex justify={'space-between'}>
            <Flex w={'50%'} direction={'column'} gap={3}>
              <ViewData label="Invoice Date" value={formatStandardDate(invoices.invoice_date)} />
              <ViewData label="Delivery Date" value={formatStandardDate(invoices.delivery_date)} />
              <ViewData label="Due Date" value={formatStandardDate(invoices.due_date)} />
            </Flex>
            <Flex w={'50%'} direction={'column'} gap={3}>
              <ViewData label="Payment Term" value={invoices.payment_terms} />
              <ViewData label="Currency" value={invoices.currency} />
            </Flex>
          </Flex>
        </Stack>
      </ModuleAccountingCustomerFormLayout>

      <ModuleAccountingCustomerFormLayout title="Notes/Terms and Conditions">
        <ViewData label="Notes" value={invoices.notes || "-"} />
      </ModuleAccountingCustomerFormLayout>

      <ModuleAccountingCustomerInvoiceDetailTabs
        order={<ModuleAccountingCustomerOrderDetail datas={invoices.order_details} />}
        journal={<ModuleAccountingCustomerJournalDetail datas={invoices.journal_details} />}
      />
    </Stack>
  )
}
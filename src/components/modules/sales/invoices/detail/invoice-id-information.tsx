import ModuleSalesOrderFormLayout from "../layout";
import { Text } from "@chakra-ui/react";

export default function ModuleSalesInvoiceIdInformation({
  invoiceId
}: {
  invoiceId: string
}) {
  return (
    <ModuleSalesOrderFormLayout
      title="Invoice ID"
    >
      <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight={'bold'}>
        {invoiceId}
      </Text>
    </ModuleSalesOrderFormLayout>
  )
}
import ModuleSalesInvoiceFormLayout from "../layout";
import { Text } from "@chakra-ui/react";

export default function ModuleSalesInvoiceDateCreate() {
  const date = new Date();
  const currentDate = date.toISOString().split('T')[0];

  return (
    <ModuleSalesInvoiceFormLayout
      title="Date"
    >
      <Text fontSize={{ base: 'sm' }}>
        {Intl.DateTimeFormat('en-US', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }).format(new Date(currentDate))}
      </Text>
    </ModuleSalesInvoiceFormLayout>
  )
}
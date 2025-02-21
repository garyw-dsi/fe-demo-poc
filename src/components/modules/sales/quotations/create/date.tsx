import ModuleSalesQuotationFormLayout from "../layout";
import { Text } from "@chakra-ui/react";

export default function ModuleSalesQuotationDateCreate() {
  const date = new Date();
  const currentDate = date.toISOString().split('T')[0];

  return (
    <ModuleSalesQuotationFormLayout
      title="Quotation Date"
    >
      <Text fontSize={{ base: 'sm' }}>
        {Intl.DateTimeFormat('en-US', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }).format(new Date(currentDate))}
      </Text>
    </ModuleSalesQuotationFormLayout>
  )
}
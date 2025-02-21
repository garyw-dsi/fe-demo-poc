import ModuleSalesQuotationFormLayout from "../layout";
import { Text } from "@chakra-ui/react";

export default function ModuleSalesQuotationIdDetail({
  quotationID
}: {
  quotationID: string
}) {
  return (
    <ModuleSalesQuotationFormLayout
      title="Quotation ID"
    >
      <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight={'bold'}>
        {quotationID}
      </Text>
    </ModuleSalesQuotationFormLayout>
  )
}
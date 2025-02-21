import ModuleSalesOrderFormLayout from "../layout";
import { Text } from "@chakra-ui/react";

export default function ModuleCRMLeadIdInformation({
  leadId
}: {
  leadId: string
}) {
  return (
    <ModuleSalesOrderFormLayout
      title="Lead ID"
    >
      <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight={'bold'}>
        {leadId}
      </Text>
    </ModuleSalesOrderFormLayout>
  )
}
import ModuleSalesOrderFormLayout from "../layout";
import { Text } from "@chakra-ui/react";

export default function ModuleSalesInvoiceNotesInformation({
  notes
}: {
  notes: string | null
}) {
  return (
    <ModuleSalesOrderFormLayout
      title="Notes"
    >
      <Text fontSize={{ base: 'md' }}>
        {notes ? notes : '-'}
      </Text>
    </ModuleSalesOrderFormLayout>
  )
}
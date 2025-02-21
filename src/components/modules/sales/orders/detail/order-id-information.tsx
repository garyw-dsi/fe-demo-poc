import ModuleSalesOrderFormLayout from "../layout";
import { Text } from "@chakra-ui/react";

export default function ModuleSalesOrderIdInformation({
  orderId
}: {
  orderId: string
}) {
  return (
    <ModuleSalesOrderFormLayout
      title="Order ID"
    >
      <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight={'bold'}>
        {orderId}
      </Text>
    </ModuleSalesOrderFormLayout>
  )
}
"use client"

import { Stack, Text, useColorModeValue } from "@chakra-ui/react";
import ModuleSalesOrderFormLayout from "../layout";
import { components } from "@/libs/api/schema/sales";

const DetailLabel = ({ label }: { label: string }) => {
  return (
    <Text
      fontSize={'xs'}
      color={useColorModeValue('gray.500', 'gray.300')}
    >
      {label}
    </Text>
  )
}

export default function ModuleSalesOrderDeliveryTerms({
  data
}: {
  data: components['schemas']['Order']['delivery_term'] | undefined
}) {
  return (
    <ModuleSalesOrderFormLayout title="Delivery Terms">
      <Stack spacing={5}>

        <Stack spacing={1}>
          <DetailLabel label="Term" />
          <Text fontWeight={'bold'}>{data || "-"}</Text>
        </Stack>
      </Stack>
    </ModuleSalesOrderFormLayout>
  )
}
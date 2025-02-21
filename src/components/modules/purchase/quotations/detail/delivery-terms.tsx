"use client"

import { Stack, Text, useColorModeValue } from "@chakra-ui/react";
import ModulePurchaseQuotationFormLayout from "../layout";
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

export default function ModulePurchaseQuotationDeliveryTerms({
  data
}: {
  data: components['schemas']['Quotation']['delivery_terms']
}) {
  return (
    <ModulePurchaseQuotationFormLayout title="Delivery Terms">
      <Stack spacing={1}>
        <DetailLabel label="Term" />
        <Text fontWeight={'bold'}>{data}</Text>
      </Stack>
    </ModulePurchaseQuotationFormLayout>
  )
}
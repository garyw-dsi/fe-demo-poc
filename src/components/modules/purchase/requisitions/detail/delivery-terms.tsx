"use client"

import { Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { components } from "@/libs/api/schema/sales";
import ModulePurchaseRequisitionFormLayout from "../layout";


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

export default function ModulePurchaseRequisitionDeliveryTerms({
  data
}: {
  data: components['schemas']['Quotation']['delivery_terms']
}) {
  return (
    <ModulePurchaseRequisitionFormLayout title="Delivery Terms">
      <Stack spacing={1}>
        <DetailLabel label="Term" />
        <Text fontWeight={'bold'}>{data}</Text>
      </Stack>
    </ModulePurchaseRequisitionFormLayout>
  )
}
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

export default function ModulePurchaseQuotationPaymentTerms({
  data
}: {
  data: components['schemas']['Quotation']
}) {
  return (
    <ModulePurchaseQuotationFormLayout title="Payment Terms">
      <Stack spacing={5}>
        {data.payment_dp && (
          <Stack spacing={1}>
            <DetailLabel label="Payment DP" />
            <Text fontWeight={'bold'}>
              {(data.payment_dp * 100).toFixed(2)}%
            </Text>
          </Stack>
        )}
        {data.payment_dp_rate && (
          <Stack spacing={1}>
            <DetailLabel label="Payment DP Rate" />
            <Text fontWeight={'bold'}>
              {(data.payment_dp_rate * 100).toFixed(2)}%
            </Text>
          </Stack>
        )}
        <Stack spacing={1}>
          <DetailLabel label="Payment Terms" />
          <Text fontWeight={'bold'}>{data.payment_terms}</Text>
        </Stack>
      </Stack>
    </ModulePurchaseQuotationFormLayout>
  )
}
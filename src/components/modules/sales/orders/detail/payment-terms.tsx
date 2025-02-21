"use client"

import { Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { components } from "@/libs/api/schema/sales";
import ModuleSalesQuotationFormLayout from "../layout";

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

export default function ModuleSalesOrderPaymentTerms({
  data
}: {
  data: components['schemas']['Order']
}) {
  return (
    <ModuleSalesQuotationFormLayout title="Payment Terms">
      <Stack spacing={5}>
        {data.payment_dp && (
          <Stack spacing={1}>
            <DetailLabel label="Payment DP" />
            <Text fontWeight={'bold'}>
              {(Number(data.payment_dp || 0) * 100).toFixed(2)}%
            </Text>
          </Stack>
        )}
        {data.payment_dp_rate && (
          <Stack spacing={1}>
            <DetailLabel label="Payment DP Rate" />
            <Text fontWeight={'bold'}>
              {(Number(data.payment_dp_rate || 0) * 100).toFixed(2)}%
            </Text>
          </Stack>
        )}
        <Stack spacing={1}>
          <DetailLabel label="Payment Terms" />
          <Text fontWeight={'bold'}>{data.payment_term}</Text>
        </Stack>
      </Stack>
    </ModuleSalesQuotationFormLayout>
  )
}
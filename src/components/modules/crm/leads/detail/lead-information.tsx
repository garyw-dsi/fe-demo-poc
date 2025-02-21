"use client"

import { Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import ModuleCRMLeadsFormLayout from "../layout";
import { components } from "@/libs/api/schema/crm";
import { viewFormattedStdPhone } from "@/utils/formatted-std-phone";

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

export default function ModuleCRMLeadReadInformation({
  data
}: {
  data: components['schemas']['Lead']
}) {
  return (
    <ModuleCRMLeadsFormLayout
      title="Lead Information"
    >
      <Flex
        flexWrap={'wrap'}
        flex={1}
        justify={'space-between'}
        gap={5}
        pt={3}
      >
        <Stack spacing={0}>
          <DetailLabel label="Contact Name" />
          <Text fontWeight={'bold'} fontSize={'md'}>
            {data.contact_name || "-"}
          </Text>
        </Stack>
        <Stack spacing={0}>
          <DetailLabel label="Email Address" />
          <Text fontWeight={'bold'} fontSize={'md'}>
            {data.email || "-"}
          </Text>
        </Stack>
        <Stack spacing={0}>
          <DetailLabel label="Phone" />
          <Text fontWeight={'bold'} fontSize={'md'}>
            {data.phone
              ? viewFormattedStdPhone(data.phone)
              : "-"
            }
          </Text>
        </Stack>
        <Stack spacing={0}>
          <DetailLabel label="Address" />
          <Text fontWeight={'bold'} fontSize={'md'}>
            {data.address || "-"}
          </Text>
        </Stack>
      </Flex>
    </ModuleCRMLeadsFormLayout>
  )
}
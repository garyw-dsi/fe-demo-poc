"use client"

import { components } from "@/libs/api/schema/uam"
import { Avatar, Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";

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

export default function DetailProfileOrganizationInformation({
  organization
}: {
  organization: components["schemas"]["Organization"] | null | undefined;
}) {
  if (!organization) {
    return (
      <Text>
        No organization information
      </Text>
    )
  }

  return (
    <Stack spacing={5}>
      <Flex align={'center'} gap={5}>
        <Avatar
          name={organization.legal_name}
          rounded={'md'}
        />
        <Text fontWeight={'bold'} fontSize={'lg'}>
          {organization.legal_name}
        </Text>
      </Flex>

      <Stack spacing={0}>
        <DetailLabel label="Legal Type" />
        <Text>
          {organization.legal_type}
        </Text>
      </Stack>

      <Stack spacing={0}>
        <DetailLabel label="Created By" />
        <Text>
          {organization.created_by.first_name} {organization.created_by.last_name}
        </Text>
      </Stack>

      <Stack spacing={0}>
        <DetailLabel label="Maintain By" />
        <Text>
          {organization.maintainer.first_name} {organization.maintainer.last_name}
        </Text>
      </Stack>
    </Stack>
  )
}

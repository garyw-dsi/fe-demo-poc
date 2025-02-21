"use client"

import { components } from "@/libs/api/schema/uam"
import { Avatar, Divider, Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react"

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

export default function ModuleUAMOrganization({
  organization
}: {
  organization: components["schemas"]['Organization']
}) {
  return (
    <Flex
      bg={useColorModeValue('white', 'gray.800')}
      border={'1px'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      rounded={"md"}
      w={'full'}
      p={5}
      direction={'column'}
      gap={5}
    >
      <Flex align={'center'} gap={5}>
        <Avatar
          name={organization.legal_name}
          rounded={'md'}
          src={organization.image.url || undefined}
        />
        <Text fontWeight={'bold'} fontSize={'lg'}>
          {organization.legal_name}
        </Text>
      </Flex>

      <Divider />

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
    </Flex>
  )
}
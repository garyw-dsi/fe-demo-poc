"use client"

import { components } from "@/libs/api/schema/core-services"
import ModuleHREmployeeFormLayout from "../layout"
import { Avatar, Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react"

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

export default function ModuleHREmployeeContactInformation({
  contact
}: {
  contact: components['schemas']['ContactMin']
}) {
  return (
    <ModuleHREmployeeFormLayout title="Contact Information">
      <Stack spacing={5}>
        <Flex
          gap={5}
          direction={{ base: 'column', lg: 'row' }}
        >
          <Avatar
            src={contact.image.url || undefined}
            size={'xl'}
            name={contact.name}
            rounded={'md'}
          />

          <Flex direction={'column'} gap={5} w={'full'}>
            <Stack spacing={0}>
              <DetailLabel label="Contact Name" />
              <Text fontWeight={'bold'} fontSize={{ base: 'sm', md: "md" }}>
                {contact.name}
              </Text>
            </Stack>
          </Flex>
          <Flex direction={'column'} gap={5} w={'full'}>
            <Stack spacing={0}>
              <DetailLabel label="Contact Legal" />
              <Text fontWeight={'bold'} fontSize={{ base: 'sm', md: "md" }}>
                {contact.legal_type}
              </Text>
            </Stack>
          </Flex>
        </Flex>
      </Stack>
    </ModuleHREmployeeFormLayout>
  )
}
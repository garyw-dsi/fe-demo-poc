"use client"

import { components } from "@/libs/api/schema/core-services";
import { Avatar, Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import ModuleCRMCustomerFormLayout from "../layout";
import ModuleCRMCustomerInformationHeader from "./header";

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

export default function ModuleCRMCustomerMinimalInformation({
  customer
}: {
  customer: components['schemas']['ContactMin'] | undefined
}) {
  return (
    <ModuleCRMCustomerFormLayout
      title="Customer Information"
      action={
        <ModuleCRMCustomerInformationHeader pk={customer?.pk} />
      }
    >
      <Stack spacing={5}>
        <Flex
          gap={{ base: 5, lg: 10 }}
          direction={{ base: 'column', lg: 'row' }}
        >
          <Avatar
            src={customer?.image.url || undefined}
            size={'xl'}
            name={customer?.name}
            rounded={'md'}
          />

          <Stack spacing={5}>
            <Flex direction={'column'} gap={5} w={'full'}>
              <Stack spacing={0}>
                <DetailLabel label="customer Name" />
                <Text fontWeight={'bold'} fontSize={'lg'}>
                  {customer?.name}
                </Text>
              </Stack>
            </Flex>
            <Flex direction={'column'} gap={5} w={'full'}>
              <Stack spacing={0}>
                <DetailLabel label="Legal Type" />
                <Text fontSize={'md'}>
                  {customer?.legal_type}
                </Text>
              </Stack>
            </Flex>
          </Stack>
        </Flex>
      </Stack>
    </ModuleCRMCustomerFormLayout>
  )
}

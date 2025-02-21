"use client"

import { components } from "@/libs/api/schema/core-services";
import { Avatar, Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import ModulePurchaseQuotationFormLayout from "../layout";
import ModulePurchaseVendorInformationHeader from "./header";

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

export default function ModulePurchaseVendorMinimalInformation({
  vendor
}: {
  vendor: components['schemas']['ContactMin'] | undefined
}) {
  return (
    <ModulePurchaseQuotationFormLayout
      title="Vendor Information"
      action={
        <ModulePurchaseVendorInformationHeader pk={vendor?.pk} />
      }
    >
      <Stack spacing={5}>
        <Flex
          gap={{ base: 5, lg: 10 }}
          direction={{ base: 'column', lg: 'row' }}
        >
          <Avatar
            src={vendor?.image.url || undefined}
            size={'xl'}
            name={vendor?.name}
            rounded={'md'}
          />

          <Stack spacing={5}>
            <Flex direction={'column'} gap={5} w={'full'}>
              <Stack spacing={0}>
                <DetailLabel label="Vendor Name" />
                <Text fontWeight={'bold'} fontSize={'lg'}>
                  {vendor?.name}
                </Text>
              </Stack>
            </Flex>
            <Flex direction={'column'} gap={5} w={'full'}>
              <Stack spacing={0}>
                <DetailLabel label="Legal Type" />
                <Text fontSize={'md'}>
                  {vendor?.legal_type}
                </Text>
              </Stack>
            </Flex>
          </Stack>
        </Flex>
      </Stack>
    </ModulePurchaseQuotationFormLayout>
  )
}

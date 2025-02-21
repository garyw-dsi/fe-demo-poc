"use client"

import { components } from "@/libs/api/schema/core-services";
import { Avatar, Flex, Stack, Tag, Text, useColorModeValue } from "@chakra-ui/react";
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

export default function ModulePurchaseVendorInformation({
  vendor
}: {
  vendor: components['schemas']['Contact'] | undefined
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
          gap={5}
          direction={{ base: 'column', lg: 'row' }}
        >
          <Avatar
            src={vendor?.image.url || undefined}
            size={'xl'}
            name={vendor?.name}
            rounded={'md'}
          />

          <Flex direction={'column'} gap={5} w={'full'}>
            <Stack spacing={0}>
              <DetailLabel label="Vendor Name" />
              <Text fontWeight={'bold'} fontSize={'lg'}>
                {vendor?.name}
              </Text>
            </Stack>
            {vendor?.tags && vendor.tags.length > 0 && (
              <Stack spacing={2}>
                <DetailLabel label="Tags" />
                <Flex align={'center'} gap={2} flexWrap={'wrap'}>
                  {vendor.tags.map((tag, index) => (
                    <Tag key={index} size={'sm'} variant="solid" colorScheme="teal">
                      {tag.name}
                    </Tag>
                  ))}
                </Flex>
              </Stack>
            )}
          </Flex>
          <Flex direction={'column'} gap={5} w={'full'}>
            <Stack spacing={0}>
              <DetailLabel label="Legal Type" />
              <Text fontSize={'md'}>
                {vendor?.legal_type}
              </Text>
            </Stack>
            <Stack spacing={0}>
              <DetailLabel label="Tax ID" />
              <Text fontWeight={'bold'} fontSize={'lg'}>
                {vendor?.tax_id}
              </Text>
            </Stack>
          </Flex>
        </Flex>
      </Stack>
    </ModulePurchaseQuotationFormLayout>
  )
}

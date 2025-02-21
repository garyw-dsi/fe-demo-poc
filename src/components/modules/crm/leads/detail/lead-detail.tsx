"use client"

import { components } from "@/libs/api/schema/crm"
import { Flex, Icon, Stack, Tag, Text, useColorModeValue } from "@chakra-ui/react"
import ModuleCRMLeadsFormLayout from "../layout"
import { RxOpenInNewWindow } from "react-icons/rx"
import { useRouter } from "next/navigation"

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

const leadScoreMapping: { [key: number]: string } = {
  0: "Likely",
  1: "Very Likely",
  2: "Most Likely"
};

export default function ModuleCRMReadLeadDetail({
  data
}: {
  data: components['schemas']['Lead'];
}) {
  const router = useRouter();

  return (
    <ModuleCRMLeadsFormLayout
      title="Lead Detail"
    >
      <Stack spacing={5}>
        <Stack spacing={0}>
          <DetailLabel label="Opportunity Name" />
          <Text fontWeight={'bold'} fontSize={'lg'}>
            {data.name}
          </Text>
        </Stack>
        <Stack spacing={0}>
          <DetailLabel label="Customer Name" />
          <Flex align={'center'} gap={3}>
            <Text fontWeight={'bold'} fontSize={'lg'}>
              {
                data.customer
                  ? data.customer.contact.name
                  : data.customer_name
              }
            </Text>
            {data.customer && (
              <Icon
                as={RxOpenInNewWindow}
                boxSize={5}
                cursor={'pointer'}
                _hover={{ color: 'teal.500' }}
                onClick={() => router.push(`/modules/crm/customers/detail/${data.customer?.pk}`)}
              />
            )}
          </Flex>
        </Stack>
        <Stack spacing={0}>
          <DetailLabel label="Lead Source" />
          <Text fontWeight={'bold'} fontSize={'lg'}>
            {data.lead_source}
          </Text>
        </Stack>
        <Stack spacing={0}>
          <DetailLabel label="Lead Score" />
          <Text fontWeight={'bold'} fontSize={'lg'}>
            {leadScoreMapping[parseInt(data.lead_score.toString())] || "Missing Lead Score Value"}
          </Text>
        </Stack>
        {data?.tags?.length > 0 && (
          <Stack spacing={2}>
            <DetailLabel label="Tags" />
            <Flex align={'center'} gap={2} flexWrap={'wrap'}>
              {data.tags.map((tag, index) => (
                <Tag key={index} size={'sm'} variant="solid" colorScheme="teal">
                  {tag.name}
                </Tag>
              ))}
            </Flex>
          </Stack>
        )}
      </Stack>
    </ModuleCRMLeadsFormLayout>
  )
}
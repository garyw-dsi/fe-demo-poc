"use client"

import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation"
import { FaPlus } from "react-icons/fa";
import { RxOpenInNewWindow } from "react-icons/rx";

export default function ModuleCRMLeadsFeedHeader() {
  const router = useRouter();
  return (
    <Flex justify={'space-between'} align={'center'}>
      <Text fontSize={{ md: 'lg' }} fontWeight={'bold'}>My Leads</Text>
      <Flex gap={3} align={'center'}>
        <Button
          size={'sm'}
          onClick={() => router.push("/modules/crm/leads")}
        >
          <Icon as={RxOpenInNewWindow} boxSize={4} />
        </Button>
        <Button
          size={'sm'}
          fontSize={'xs'}
          variant={'outline'}
          colorScheme="blue"
          leftIcon={
            <Icon as={FaPlus} />
          }
          onClick={() => {
            router.push('/modules/crm/leads/create')
          }}
        >
          New
        </Button>
      </Flex>
    </Flex>
  )
}
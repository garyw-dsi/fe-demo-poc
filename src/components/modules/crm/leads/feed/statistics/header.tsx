"use client"

import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation"
import { RxOpenInNewWindow } from "react-icons/rx";

export default function ModuleCRMLeadsFeedStatsDoughnutHeader() {
  const router = useRouter();
  return (
    <Flex justify={'space-between'} align={'center'}>
      <Text fontSize={{ md: 'lg' }} fontWeight={'bold'}>
        Leads Status Comparison
      </Text>
      <Flex gap={3} align={'center'}>
        <Button
          size={'sm'}
          onClick={() => router.push("/modules/crm/customers")}
        >
          <Icon as={RxOpenInNewWindow} boxSize={4} />
        </Button>
      </Flex>
    </Flex>
  )
}
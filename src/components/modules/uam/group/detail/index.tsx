"use client"

import { components } from "@/libs/api/schema/uam";
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

export default function ModuleUAMGroupDetail({
  data
}: {
  data: components['schemas']['Group']
}) {
  return (
    <Flex
      bg={useColorModeValue('white', 'gray.800')}
      border={'1px'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      rounded={"md"}
      w={'full'}
      p={5}
    >
      <Flex direction={'column'}>
        <Text
          fontSize={'xs'}
          color={useColorModeValue('gray.500', 'gray.300')}
        >
          Group Name
        </Text>
        <Text fontWeight={'bold'} fontSize={'2xl'}>
          {data.name}
        </Text>
      </Flex>
    </Flex>
  )
}
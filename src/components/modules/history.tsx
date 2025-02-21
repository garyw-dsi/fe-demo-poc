"use client"

import { formatStandardTime } from "@/utils/parsing-time";
import { Avatar, Flex, Text, useColorModeValue } from "@chakra-ui/react";

interface History {
  name: string;
  date: string;
  historyTitle: string;
  historyName: string;
  avatar?: string;
}

export default function ModuleHistory({
  name,
  date,
  historyName,
  historyTitle,
  avatar
}: History) {
  return (
    <Flex
      w={{ base: 'full', md: 'sm' }}
      bg={useColorModeValue('white', 'gray.800')}
      gap={5}
      p={3}
      rounded={'md'}
      border={'1px'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Avatar
        name={name}
        rounded={'md'}
        size={'sm'}
        src={avatar || undefined}
      />
      <Flex direction={'column'} gap={2}>
        <Flex direction={'column'} gap={1}>
          <Text fontWeight={'semibold'} fontSize={'sm'}>
            {name}
          </Text>
          <Text fontSize={'xs'}
            color={useColorModeValue('gray.500', 'gray.300')}
          >
            {formatStandardTime(date)}
          </Text>
        </Flex>
        <Text fontSize={'xs'}>
          {historyTitle}
          <Text as="span"
            color={"blue.500"}
            fontSize={'xs'}
          >
            {historyName}
          </Text>
        </Text>
      </Flex>
    </Flex>
  )
}
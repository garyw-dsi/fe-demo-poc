"use client"

import { Divider, Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";

export default function ModuleHRSalaryStructureFormLayout({
  title,
  action,
  children
}: Readonly<{
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode
}>) {
  return (
    <Stack
      divider={<Divider />}
      spacing={5}
      bg={useColorModeValue('white', 'gray.800')}
      border={'1px'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      rounded={"md"}
      p={5}
      w={'full'}
    >
      <Flex justify={'space-between'} align={'center'}>
        <Text
          fontSize={{ base: "sm" }}
          fontWeight="semibold"
        >
          {title}
        </Text>
        {action}
      </Flex>

      {children}
    </Stack>
  )
}
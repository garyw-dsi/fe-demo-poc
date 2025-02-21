"use client"

import { Flex, useColorModeValue } from "@chakra-ui/react"

export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Flex
      direction={"column"}
      w={"full"}
      minH={"100dvh"}
      align={'center'}
      bg={useColorModeValue("gray.100", "gray.800")}
      py={{ base: 0, md: 12 }}
    >
      <Flex
        direction={'column'}
        bg={useColorModeValue("white", "gray.900")}
        w={{ base: "full", md: "xs" }}
        px={5} py={10}
        rounded={{ md: "md" }}
        flex={{ base: 1, md: 0 }}
        border={{ base: 0, md: '1px' }}
        borderColor={{ md: useColorModeValue("gray.200", "gray.700") }}
      >
        {children}
      </Flex>
    </Flex>
  )
}
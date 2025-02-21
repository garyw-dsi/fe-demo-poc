"use client"

import { Flex, FlexProps, useColorModeValue } from "@chakra-ui/react"

export default function ModulesHomeApplicationFeedLayout({
  children, ...props
}: FlexProps) {
  return (
    <Flex
      w={'full'}
      bg={{ base: useColorModeValue('white', 'gray.800') }}
      rounded={{ md: 'md' }}
      p={5}
      minH={{ base: 'fit-content', lg: '30vh' }}
      maxH={{ base: 'fit-content', lg: '30vh' }}
      border={{ md: '1px' }}
      overflowY={'auto'}
      borderColor={{ md: useColorModeValue('gray.200', 'gray.700') }}
      {...props}
    >
      {children}
    </Flex>
  )
}
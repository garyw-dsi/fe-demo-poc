"use client"

import { Flex, FlexProps, useColorModeValue } from "@chakra-ui/react"

export const KanbanLayout = ({ children }: { children: React.ReactNode }) => (
  <Flex
    w={'full'}
    flexWrap={'wrap'}
    gap={{ base: 2, md: 5 }}
    align={'stretch'}
    justify={'flex-start'}
  >
    {children}
  </Flex>
)

export const KanbanItem = ({ children, ...props }: FlexProps) => {
  return (
    <Flex
      bg={useColorModeValue('white', 'gray.800')}
      p={5}
      gap={4}
      rounded={'md'}
      border={'1px'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      cursor={'pointer'}
      _hover={{
        bg: useColorModeValue('gray.50', 'gray.700')
      }}
      flex={{
        base: '1 1 100%',
        md: '1 1 calc(50% - 20px)',
        lg: '1 1 calc(33.33% - 20px)',
        xl: '1 1 calc(20% - 20px)'
      }}
      maxW={{
        base: '100%',
        md: 'calc(50% - 20px)',
        lg: 'calc(33.33% - 20px)',
        xl: 'calc(20% - 20px)'
      }}
      {...props}
    >
      {children}
    </Flex>
  )
}
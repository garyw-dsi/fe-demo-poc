"use client"

import { Flex, Table, TableCellProps, TableContainer, TableProps, TableRowProps, Td, Tr, useColorModeValue } from "@chakra-ui/react";

export const TD = ({ children, ...props }: TableCellProps) => {
  return (
    <Td
      color={useColorModeValue('gray.600', 'gray.300')}
      {...props}
    >
      {children}
    </Td>
  )
}

export const TR = ({ children, ...props }: TableRowProps) => {
  return (
    <Tr
      cursor={'pointer'}
      _hover={{
        bg: useColorModeValue('gray.300', 'gray.900')
      }}
      {...props}
    >
      {children}
    </Tr>
  )
}

export default function ITable({ children, ...props }: TableProps) {
  return (
    <Flex
      flex={1}
      w="100%"
      maxW="100%"
      overflowX="auto"
    >
      <TableContainer
        overflowY="auto"
        maxH="75dvh"
        w="full"
        bg={useColorModeValue("white", "gray.800")}
        rounded="md"
        pos="relative"
        border="1px"
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Table
          variant={'striped'}
          size={'sm'}
          w={'100%'}
          {...props}
        >
          {children}
        </Table>
      </TableContainer>
    </Flex>
  )
}
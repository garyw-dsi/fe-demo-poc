"use client"

import { Td, Thead, Tr, useColorModeValue } from "@chakra-ui/react"

export default function ITableHeader({
  headers
}: {
  headers: string[]
}) {
  return (
    <Thead
      pos={'sticky'}
      top={0}
      bg={useColorModeValue('white', 'gray.800')}
      zIndex={1}
    >
      <Tr>
        {headers.map((header, index) => (
          <Td key={index} fontWeight={'bold'}>
            {header}
          </Td>
        ))}
      </Tr>
    </Thead>
  )
}
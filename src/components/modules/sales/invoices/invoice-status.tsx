"use client"

import { invoiceStatus } from "@/constants/modules/sales";
import { components } from "@/libs/api/schema/sales";
import { Button, ButtonGroup, Flex } from "@chakra-ui/react";

export default function ModuleSalesInvoiceStatus({
  status
}: {
  status: components['schemas']['Invoice']['status']
}) {
  return (
    <Flex justify={'end'} gap={5} flexWrap={'wrap-reverse'}>
      <ButtonGroup
        isAttached
        size={'sm'}
        variant={'solid'}
        w={{ base: "full", md: "fit-content" }}
      >
        {invoiceStatus.map((data, index) => {
          const isActive = data === status;
          return (
            <Button
              w={{ base: "full", md: "fit-content" }}
              key={index}
              fontSize="xs"
              colorScheme={isActive ? "teal" : "gray"}
              cursor={'default'}
            >
              {data}
            </Button>
          )
        })}
      </ButtonGroup>
    </Flex>
  )
}
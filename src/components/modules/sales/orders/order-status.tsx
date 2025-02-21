"use client"

import { orderStatus } from "@/constants/modules/sales";
import { components } from "@/libs/api/schema/sales";
import { Button, ButtonGroup, Flex } from "@chakra-ui/react";

export default function ModuleSalesOrderStatus({
  status
}: {
  status: components['schemas']['Order']['status']
}) {
  return (
    <Flex justify={'end'} gap={5} flexWrap={'wrap-reverse'}>
      <ButtonGroup
        isAttached
        size={'sm'}
        variant={'solid'}
        w={{ base: "full", md: "fit-content" }}
      >
        {orderStatus.map((data, index) => {
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
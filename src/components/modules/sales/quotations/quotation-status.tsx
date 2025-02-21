"use client"

import { quotationStatus } from "@/constants/modules/sales";
import { components } from "@/libs/api/schema/sales";
import { Button, ButtonGroup, Flex } from "@chakra-ui/react";

export default function ModuleSalesQuotationStatus({
  status
}: {
  status: components['schemas']['Quotation']['status']
}) {
  return (
    <Flex justify={'end'} gap={5} flexWrap={'wrap-reverse'}>
      <ButtonGroup isAttached size={'sm'} variant={'solid'}>
        {quotationStatus.map((data, index) => {
          const isActive = data === status;
          return (
            <Button
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
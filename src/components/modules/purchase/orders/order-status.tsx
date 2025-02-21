"use client"

import { Button, ButtonGroup, Fade, Flex } from "@chakra-ui/react";
import { useState } from "react";

type Status = "Draft" | "Sent" | "Approved" | "Cancelled"

const orderStatus: Status[] = [
  "Draft", "Sent", "Approved", "Cancelled"
];

export default function ModulePurchaseOrderStatus({
  status
}: {
  status: Status
}) {
  const [statusState, setStatusState] = useState<Status>(status);
  const statusChange = statusState !== status && statusState !== "Draft";

  return (
    <Flex justify={'end'} gap={5} flexWrap={'wrap-reverse'}>
      <Fade in={statusChange} unmountOnExit={true}>
        <Button
          size={'sm'}
          fontSize={'xs'}
          variant={'solid'}
          colorScheme="blue"
          loadingText="Updating..."
        >
          Update Status
        </Button>
      </Fade>
      <ButtonGroup isAttached size={'sm'} variant={'solid'}>
        {orderStatus.map((status, index) => {
          const isActive = statusState === status;
          return (
            <Button
              key={index}
              fontSize="xs"
              colorScheme={isActive ? "teal" : "gray"}
              onClick={() => setStatusState(status)}
            >
              {status}
            </Button>
          )
        })}
      </ButtonGroup>
    </Flex>
  )
}
"use client"

import { Button, ButtonGroup, Fade, Flex, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { payrollBatchStatus } from "./constant";
import { PayrollBatchStatus, PayrollDetail } from "./type";


export default function ModuleHRPayrollBatchStatus({
  data, userCanUpdate
}: {
  data: PayrollDetail;
  userCanUpdate: boolean;
}) {
  const toast = useToast();

  const [loading, setLoading] = useState<boolean>(false);
  const [statusState, setStatusState] = useState<PayrollBatchStatus>(data.batches.status);

  const onChangeStatus = async () => {
    setLoading(true);
    try {
      return toast({
        title: "Success",
        description: "Successfully updated status",
        status: "success",
      })
    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : "Unknown error occurred"

      return toast({
        title: "Error",
        description: errorMessage,
        status: "error",
      })
    } finally {
      setLoading(false);
    }
  }

  const statusChanged = data.batches.status !== statusState
    && statusState !== "Draft"
    && userCanUpdate;

  return (
    <Flex justify={'end'} gap={5} flexWrap={'wrap-reverse'}>
      <Fade in={statusChanged} unmountOnExit={true}>
        <Button
          size={'sm'}
          fontSize={'xs'}
          variant={'solid'}
          onClick={onChangeStatus}
          colorScheme="blue"
          isLoading={loading}
          loadingText="Updating..."
        >
          Update Status
        </Button>
      </Fade>
      <ButtonGroup isAttached size={'sm'} variant={'solid'}>
        {payrollBatchStatus.map((status, index) => {
          const isActive = statusState === status;
          return (
            <Button
              key={index}
              fontSize="xs"
              colorScheme={isActive ? "teal" : "gray"}
              onClick={() => userCanUpdate && setStatusState(status)}
            >
              {status}
            </Button>
          )
        })}
      </ButtonGroup>
    </Flex>
  )
}
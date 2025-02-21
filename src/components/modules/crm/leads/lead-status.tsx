"use client"

import { Button, ButtonGroup, Fade, Flex, useToast } from "@chakra-ui/react";
import { useState } from "react";

import { changeLeadStatus } from "@/app/actions/modules/crm/leads";
import { leadStatus, leadStatusFlow } from "@/constants/modules/crm";
import { components } from "@/libs/api/schema/crm";

type LeadStatus = components['schemas']['LeadStatus'];

export default function ModuleCRMLeadStatus({
  data, 
  userCanUpdate,
}: {
  data: components['schemas']['Lead'];
  userCanUpdate: boolean;
}) {
  const toast = useToast();

  const [loading, setLoading] = useState<boolean>(false);
  const [statusState, setStatusState] = useState<LeadStatus>(data.lead_status);

  const onChangeStatus = async () => {
    setLoading(true);
    try {
      const { status, message } = await changeLeadStatus({
        leadId: data.pk,
        status: statusState as components["schemas"]["SetLeadStatus"]["lead_status"]
      });

      if (status === "success") {
        return toast({
          title: "Success",
          description: message,
          status: "success",
        })
      }
      throw new Error(message);
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

  const statusChanged = data.lead_status !== statusState
    && statusState !== "New"
    && userCanUpdate;

  const canChangeToStatus = (targetStatus: LeadStatus): boolean => {
    if (!userCanUpdate) return false;
    const allowedNextStatuses = leadStatusFlow[data.lead_status];
    return allowedNextStatuses.includes(targetStatus);
  };

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
        {leadStatus.map((status, index) => {
          const isActive = statusState === status;
          const isDisabled = !isActive && !canChangeToStatus(status);
          
          return (
            <Button
              key={index}
              fontSize="xs"
              colorScheme={isActive ? "teal" : "gray"}
              onClick={() => !isDisabled && setStatusState(status)}
              opacity={isDisabled ? 0.5 : 1}
              cursor={isDisabled ? "not-allowed" : "pointer"}
              _hover={{
                opacity: isDisabled ? 0.5 : 0.8
              }}
            >
              {status}
            </Button>
          )
        })}
      </ButtonGroup>
    </Flex>
  );
}
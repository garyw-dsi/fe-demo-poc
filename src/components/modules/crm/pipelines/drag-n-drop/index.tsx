"use client";

import { useState } from "react";
import { Flex, useColorModeValue, useToast } from "@chakra-ui/react";
import { DndContext, PointerSensor, useSensor, useSensors, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { components } from "@/libs/api/schema/crm";
import { changeLeadStatus } from "@/app/actions/modules/crm/leads";

import ModuleCRMPipelinesDragNDropColumn from "./column";
import { leadStatus } from "@/constants/modules/crm";

type Lead = components["schemas"]["Lead"];
type LeadStatus = components["schemas"]["LeadStatus"];

export default function ModuleCRMPipelinesDragNDrop({
  datas,
}: {
  datas: Lead[];
}) {
  const toast = useToast();
  const [leads, setLeads] = useState<Lead[]>(datas);

  const sensors = useSensors(
    useSensor(
      PointerSensor,
      { activationConstraint: { distance: 5 } }
    )
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const leadId = Number(active.id);
    const lead = leads.find((lead) => lead.pk === leadId);

    const newStatus = over.id as LeadStatus;
    const oldStatus = lead?.lead_status as LeadStatus;

    if (!lead) return;

    if (newStatus === "New") {
      toast.closeAll();

      return toast({
        title: "Action Denied",
        description: "You can't move the lead to 'New' status.",
        status: "error",
      });
    }

    setLeads((prevLeads) => prevLeads.map((lead) => {
      if (lead.pk === leadId) {
        return { ...lead, lead_status: newStatus };
      }
      return lead;
    }));

    try {
      const response = await changeLeadStatus({
        leadId,
        status: newStatus as components["schemas"]["SetLeadStatus"]["lead_status"],
      });

      if (response.status !== "success") {
        throw new Error(response.message);
      }
    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : "An unknown error occurred.";

      setLeads((prevLeads) => prevLeads.map((lead) => {
        if (lead.pk === leadId) {
          return { ...lead, lead_status: oldStatus };
        }
        return lead;
      }));

      return toast({
        title: "Error",
        description: errorMessage,
        status: "error",
      });
    }
  };

  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <Flex
        py={5}
        gap={4}
        flex={1}
        overflowX="auto"
        w="sm"
        minH="70vh"
      >
        {leadStatus.map((status, index) => (
          <ModuleCRMPipelinesDragNDropColumn
            key={status}
            column={status}
            tasks={leads.filter((lead) => lead.lead_status === status)}
            borderRight={index === leadStatus.length - 1 ? "none" : "1px solid"}
            borderColor={borderColor}
            pe={index === leadStatus.length - 1 ? 0 : 4}
          />
        ))}
      </Flex>
    </DndContext>
  );
}

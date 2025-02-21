"use client"

import { components } from "@/libs/api/schema/crm"
import { Avatar, Box, Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import { useDraggable } from "@dnd-kit/core";
import { useRouter } from "next/navigation";

export default function ModuleCRMPipelinesDragNDropCard({
  task
}: {
  task: components["schemas"]["Lead"]
}) {
  const router = useRouter();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.pk,
  });

  const style = transform
    ? {
      transform: `translate(${transform.x}px, ${transform.y}px)`,
    }
    : undefined;

  return (
    <Box
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      p={4}
      bg={useColorModeValue("gray.100", "gray.700")}
      rounded={'md'}
      style={style}
      onClick={() => router.push(`/modules/crm/leads/detail/${task.pk}`)}
    >
      <Stack spacing={4}>
        <Text fontWeight={'semibold'}>{task.name}</Text>
        <Flex align={'center'} gap={3}>
          <Avatar
            name={
              task.customer?.contact.name ||
              task.customer_name ||
              "Unknown"
            }
            size={'sm'}
            src={task.customer?.contact.image.url || undefined}
            rounded={'md'}
          />
          <Text
            fontSize={'sm'}
          >
            {
              task.customer?.contact.name ||
              task.customer_name ||
              "Unknown"
            }
          </Text>
        </Flex>
      </Stack>
    </Box>
  )
}
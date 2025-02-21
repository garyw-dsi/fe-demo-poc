"use client"

import { components } from "@/libs/api/schema/crm"
import { Box, BoxProps, Stack, Text } from "@chakra-ui/react"
import { useDroppable } from "@dnd-kit/core"
import ModuleCRMPipelinesDragNDropCard from "./card"

interface Props extends BoxProps {
  column: components["schemas"]["LeadStatus"]
  tasks: components["schemas"]["Lead"][]
}

export default function ModuleCRMPipelinesDragNDropColumn({
  column, tasks, ...props
}: Props) {
  const { setNodeRef } = useDroppable({
    id: column
  });

  return (
    <Box minW="md" {...props}>
      <Text fontSize={'md'} mb={4}>
        {column}
      </Text>
      <Stack ref={setNodeRef}>
        {tasks.map((task) => (
          <ModuleCRMPipelinesDragNDropCard key={task.pk} task={task} />
        ))}
      </Stack>
    </Box>
  )
}
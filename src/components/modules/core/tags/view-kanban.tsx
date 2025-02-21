"use client"

import { components } from "@/libs/api/schema/core-services";
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { KanbanItem, KanbanLayout } from "@/components/modules/main/kanban";

const Kanban = ({
  data
}: {
  data: components["schemas"]["Tag"]
}) => {
  return (
    <KanbanItem>
      <Flex direction={'column'} gap={1}>
        <Text fontSize={'sm'} fontWeight={'bold'}>
          {data.name}
        </Text>
        <Text
          fontSize={'xs'}
          color={useColorModeValue('gray.500', 'gray.400')}
        >
          {data.created_by.email}
        </Text>
      </Flex>
    </KanbanItem>
  )
}

export default function ModuleTagsKanbanView({
  datas
}: {
  datas: components["schemas"]["Tag"][];
}) {
  return (
    <KanbanLayout>
      {datas.map((data, index) => (
        <Kanban key={index} data={data} />
      ))}
    </KanbanLayout>
  )
}
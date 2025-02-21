"use client"

import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { components } from "@/libs/api/schema/uam";
import { useRouter } from "next/navigation";
import { KanbanItem, KanbanLayout } from "@/components/modules/main/kanban";

const Kanban = ({
  data
}: {
  data: components["schemas"]["Group"]
}) => {
  const router = useRouter();
  return (
    <KanbanItem
      onClick={() => router.push(`/modules/uam/groups/detail/${data.pk}`)}
    >
      <Flex direction={'column'} gap={1}>
        <Text fontSize={'sm'} fontWeight={'bold'}>
          {data.name}
        </Text>
        <Text fontSize={'xs'} color={useColorModeValue("gray.500", "gray.300")}>
          {data.organization.legal_name}
        </Text>
      </Flex>
    </KanbanItem>
  )
}

export default function ModuleUAMGroupKanbanView({
  datas
}: {
  datas: components["schemas"]["Group"][];
}) {
  return (
    <KanbanLayout>
      {datas.map((data, index) => (
        <Kanban key={index} data={data} />
      ))}
    </KanbanLayout>
  )
}
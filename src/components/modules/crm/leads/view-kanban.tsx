"use client"

import { components } from "@/libs/api/schema/crm";
import { Flex, Tag, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { KanbanItem, KanbanLayout } from "@/components/modules/main/kanban";

const Kanban = ({
  data
}: {
  data: components["schemas"]["Lead"]
}) => {
  const router = useRouter();

  return (
    <KanbanItem
      onClick={() => router.push(
        `/modules/crm/leads/detail/${data.pk}`
      )}
    >
      <Flex
        direction={'column'}
        gap={1}
        w={'full'}
        justify={'space-between'}
      >
        <Text fontSize={'sm'} fontWeight={'bold'} lineHeight={1.8}>
          {data.name}
        </Text>
        <Flex justify={'end'} w={'full'}>
          <Tag
            size={'sm'}
            colorScheme="teal"
            w={'fit-content'}
          >
            {data.lead_status}
          </Tag>
        </Flex>
      </Flex>
    </KanbanItem>
  )
}

export default function ModuleCRMLeadsKanbanView({
  datas
}: {
  datas: components["schemas"]["Lead"][];
}) {
  return (
    <KanbanLayout
    >
      {datas.map((data, index) => (
        <Kanban key={index} data={data} />
      ))}
    </KanbanLayout>
  )
}
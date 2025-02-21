"use client"

import { useRouter } from "next/navigation";
import { components } from "@/libs/api/schema/core-services";
import { Avatar, Flex, Tag, Text, useColorModeValue } from "@chakra-ui/react";
import { KanbanItem, KanbanLayout } from "@/components/modules/main/kanban";

const Kanban = ({
  data
}: {
  data: components["schemas"]["Contact"]
}) => {
  const router = useRouter();

  return (
    <KanbanItem
      direction={'column'}
      onClick={() => router.push(
        `/modules/core/contacts/detail/${data.pk}`
      )}
    >
      <Flex gap={4}>
        <Avatar
          size={'sm'}
          rounded={'sm'}
          src={data.image.url || undefined}
          name={data.name}
        />
        <Flex direction={'column'} gap={1} justify={'space-between'}>
          <Text fontSize={'sm'} fontWeight={'bold'}>
            {data.name}
          </Text>
          <Text
            fontSize={'xs'}
            color={useColorModeValue('gray.500', 'gray.400')}
          >
            {data.legal_type}
          </Text>
        </Flex>
      </Flex>
      <Tag
        size={'sm'}
        colorScheme={data.deleted_at ? 'red' : 'green'}
        w={'fit-content'}
      >
        {data.deleted_at ? 'Archived' : 'Active'}
      </Tag>
    </KanbanItem>
  )
}

export default function ModuleContactsKanbanView({
  datas
}: {
  datas: components["schemas"]["Contact"][];
}) {
  return (
    <KanbanLayout>
      {datas.map((data, index) => (
        <Kanban key={index} data={data} />
      ))}
    </KanbanLayout>
  )
}
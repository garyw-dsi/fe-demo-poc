"use client"

import { Avatar, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { components } from "@/libs/api/schema/uam";
import { useRouter } from "next/navigation";
import { KanbanItem, KanbanLayout } from "@/components/modules/main/kanban";

const Kanban = ({
  data
}: {
  data: components["schemas"]["User"]
}) => {
  const name = `${data.first_name} ${data.last_name}`;
  const router = useRouter();

  return (
    <KanbanItem
      onClick={() => router.push(`/modules/uam/users/detail/${data.pk}`)}
    >
      <Avatar
        name={name}
        size={'sm'}
        rounded={'sm'}
        src={data.image.url || undefined}
      />
      <Flex direction={'column'} gap={3}>
        <Flex direction={'column'}>
          <Text fontSize={'sm'} fontWeight={'bold'}>
            {name}
          </Text>
          <Text
            fontSize={'xs'}
            color={useColorModeValue('gray.500', 'gray.400')}
          >
            {data.group?.name}
          </Text>
        </Flex>
        <Text fontSize={'xs'}>
          {data.email}
        </Text>
      </Flex>
    </KanbanItem>
  )
}

export default function ModuleUAMKanbanView({
  datas
}: {
  datas: components["schemas"]["User"][];
}) {
  return (
    <KanbanLayout>
      {datas.map((data, index) => (
        <Kanban key={index} data={data} />
      ))}
    </KanbanLayout>
  )
}
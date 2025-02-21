"use client"

import { components } from "@/libs/api/schema/crm";
import { Avatar, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { KanbanItem, KanbanLayout } from "@/components/modules/main/kanban";

const Kanban = ({
  data
}: {
  data: components["schemas"]["Customer"]
}) => {
  const router = useRouter();

  return (
    <KanbanItem
      onClick={() => router.push(
        `/modules/crm/customers/detail/${data.pk}`
      )}

    >
      <Avatar
        size={'sm'}
        rounded={'sm'}
        src={data.contact.image.url || undefined}
        name={data.contact.name}
      />
      <Flex direction={'column'} gap={1} justify={'space-between'}>
        <Text fontSize={'sm'} fontWeight={'bold'}>
          {data.contact.name}
        </Text>
        <Text
          fontSize={'xs'}
          color={useColorModeValue('gray.500', 'gray.400')}
        >
          {data.contact.legal_type}
        </Text>
      </Flex>
    </KanbanItem>
  )
}

export default function ModuleCRMCustomersKanbanView({
  datas
}: {
  datas: components["schemas"]["Customer"][];
}) {
  return (
    <KanbanLayout>
      {datas.map((data, index) => (
        <Kanban key={index} data={data} />
      ))}
    </KanbanLayout>
  )
}
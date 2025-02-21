"use client"

import { components } from "@/libs/api/schema/accounting";
import { Avatar, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { KanbanItem, KanbanLayout } from "@/components/modules/main/kanban";

const Kanban = ({
  data
}: {
  data: components["schemas"]["Account"]
}) => {
  const router = useRouter();

  return (
    <KanbanItem
      onClick={() => router.push(
        `/modules/accounting/accounts/detail/${data.pk}`
      )}
    >
      <Avatar
        size={'sm'}
        rounded={'sm'}
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
          {data.account_type}
        </Text>
      </Flex>
    </KanbanItem>
  )
}

export default function ModuleAccountingAccountsKanbanView({
  datas
}: {
  datas: components["schemas"]["Account"][];
}) {
  return (
    <KanbanLayout>
      {datas.map((data, index) => (
        <Kanban key={index} data={data} />
      ))}
    </KanbanLayout>
  )
}
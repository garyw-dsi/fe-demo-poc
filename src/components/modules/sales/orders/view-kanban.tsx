"use client"

import { Flex, Stack, Tag, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { handleStatusInfo } from "@/components/modules/sales/status";
import { components } from "@/libs/api/schema/sales";
import { KanbanItem, KanbanLayout } from "@/components/modules/main/kanban";

const Kanban = ({
  data
}: {
  data: components['schemas']['OrderList']
}) => {
  const router = useRouter();
  const { color, text } = handleStatusInfo(data.status);

  return (
    <KanbanItem
      onClick={() => router.push(
        `/modules/sales/orders/detail/${data.pk}`
      )}
    >
      <Flex direction={'column'} gap={1} w={'full'} justify={'space-between'}>
        <Stack>
          <Text fontSize={'sm'} fontWeight={'bold'}>
            {data.order_id}
          </Text>
        </Stack>

        <Flex justify={'end'}>
          <Tag colorScheme={color} size={'sm'} fontSize={'xs'}>
            {text}
          </Tag>
        </Flex>
      </Flex>
    </KanbanItem>
  )
}

export default function ModuleSalesOrdersKanbanView({
  datas
}: {
  datas: components['schemas']['OrderList'][]
}) {
  return (
    <KanbanLayout>
      {datas.map((data, index) => (
        <Kanban key={index} data={data} />
      ))}
    </KanbanLayout>
  )
}
"use client"

import { Flex, Stack, Tag, Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { handleStatusInfo } from "./status";
import { components } from "@/libs/api/schema/sales";
import { KanbanItem, KanbanLayout } from "@/components/modules/main/kanban";

const Kanban = ({
  data
}: {
  data: components['schemas']['Order'];
}) => {
  const router = useRouter();
  const { color, text } = handleStatusInfo(data.status);

  return (
    <KanbanItem
      onClick={() => router.push(
        `/modules/purchase/orders/detail/${data.pk}`
      )}
    >
      <Flex direction={'column'} gap={1} w={'full'} justify={'space-between'}>
        <Stack>
          <Text fontSize={'sm'} fontWeight={'bold'}>
            {data.quotation?.customer.contact.name}
          </Text>
          <Text
            fontSize={'xs'}
            color={useColorModeValue('gray.500', 'gray.400')}
          >
            {Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR'
            }).format(Number(data.total))}
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

export default function ModulePurchaseOrdersKanbanView({
  datas
}: {
  datas: components['schemas']['Order'][];
}) {
  return (
    <KanbanLayout>
      {datas.map((data, index) => (
        <Kanban key={index} data={data} />
      ))}
    </KanbanLayout>
  )
}
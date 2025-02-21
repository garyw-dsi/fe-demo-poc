"use client"

import { components } from "@/libs/api/schema/inventory";
import { Avatar, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { KanbanItem, KanbanLayout } from "@/components/modules/main/kanban";

const Kanban = ({
  data
}: {
  data: components["schemas"]["Product"]
}) => {
  const router = useRouter();

  return (
    <KanbanItem
      onClick={() => router.push(
        `/modules/inventory/products/detail/${data.pk}`
      )}
    >
      {data.image.url && (
        <Avatar
          size={'sm'}
          rounded={'sm'}
          src={data.image.url}
          name={data.name}
        />
      )}
      <Flex direction={'column'} gap={1}>
        <Text fontSize={'sm'} fontWeight={'bold'}>
          {data.name}
        </Text>
        <Text
          fontSize={'xs'}
          color={useColorModeValue('gray.500', 'gray.400')}
        >
          {data.product_type}
        </Text>
      </Flex>
    </KanbanItem>
  )
}

export default function ModuleInventoryProductKanbanView({
  datas
}: {
  datas: components["schemas"]["Product"][];
}) {
  return (
    <KanbanLayout>
      {datas.map((data, index) => (
        <Kanban key={index} data={data} />
      ))}
    </KanbanLayout>
  )
}
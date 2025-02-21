"use client"

import { components } from "@/libs/api/schema/inventory";
import { Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { KanbanItem, KanbanLayout } from "@/components/modules/main/kanban";

const Kanban = ({
  data
}: {
  data: components["schemas"]["ProductCategory"]
}) => {
  const router = useRouter();

  return (
    <KanbanItem
      onClick={() => router.push(
        `/modules/inventory/products/category/detail/${data.pk}`
      )}
    >
      <Flex direction={'column'} gap={1}>
        <Text fontSize={'sm'} fontWeight={'bold'}>
          {data.name}
        </Text>
      </Flex>
    </KanbanItem>
  )
}

export default function ModuleInventoryProductCategoryKanbanView({
  datas
}: {
  datas: components["schemas"]["ProductCategory"][];
}) {
  return (
    <KanbanLayout>
      {datas.map((data, index) => (
        <Kanban key={index} data={data} />
      ))}
    </KanbanLayout>
  )
}
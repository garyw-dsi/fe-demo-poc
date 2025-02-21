"use client"

import { Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { components } from "@/libs/api/schema/sales";
import { KanbanItem, KanbanLayout } from "@/components/modules/main/kanban";

const Kanban = ({
  data
}: {
  data: components['schemas']['Invoice']
}) => {
  const router = useRouter();

  return (
    <KanbanItem
      onClick={() => router.push(
        `/modules/purchase/invoices/detail/${data.pk}`
      )}
    >
      <Flex direction={'column'} gap={1} w={'full'} justify={'space-between'}>
        <Stack>
          <Text fontSize={'sm'} fontWeight={'bold'}>
            {`INV-PRCH-${data.pk}`}
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
      </Flex>
    </KanbanItem>
  )
}

export default function ModulePurchaseInvoicesKanbanView({
  datas
}: {
  datas: components['schemas']['Invoice'][]
}) {
  return (
    <KanbanLayout>
      {datas.map((data, index) => (
        <Kanban key={index} data={data} />
      ))}
    </KanbanLayout>
  )
}
"use client"

import { Flex, Stack, Tag, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { components } from "@/libs/api/schema/sales";
import { KanbanItem, KanbanLayout } from "@/components/modules/main/kanban";
import { handleStatusInvoiceInfo } from "../status";

const Kanban = ({
  data
}: {
  data: components['schemas']['InvoiceList']
}) => {
  const router = useRouter();
  const { color, text } = handleStatusInvoiceInfo(data.status);

  return (
    <KanbanItem
      onClick={() => router.push(
        `/modules/sales/invoices/detail/${data.pk}`
      )}
    >
      <Flex direction={'column'} gap={1} w={'full'} justify={'space-between'}>
        <Stack>
          <Text fontSize={'sm'} fontWeight={'bold'}>
            {data.invoice_id}
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

export default function ModuleSalesInvoicesKanbanView({
  datas
}: {
  datas: components['schemas']['InvoiceList'][]
}) {
  return (
    <KanbanLayout>
      {datas.map((data, index) => (
        <Kanban key={index} data={data} />
      ))}
    </KanbanLayout>
  )
}
"use client"

import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { CustomerTransactionView } from "./type";
import { formatStdCurrency } from "@/utils/currency";
import { KanbanItem, KanbanLayout } from "@/components/modules/main/kanban";

const Kanban = ({
  data
}: {
  data: CustomerTransactionView
}) => {
  const router = useRouter();

  return (
    <KanbanItem
      onClick={() => router.push(
        `/modules/accounting/customers/detail/${data.pk}`
      )}

    >
      <Flex direction={'column'} gap={1} justify={'space-between'}>
        <Text fontSize={'sm'} fontWeight={'bold'}>
          {data.number}
        </Text>
        <Text
          fontSize={'xs'}
          color={useColorModeValue('gray.500', 'gray.400')}
        >
          {formatStdCurrency({
            price: data.amount,
            currencyISO: data.currency
          })}
        </Text>
      </Flex>
    </KanbanItem>
  )
}

export default function ModuleAccountingCustomersKanbanView({
  datas
}: {
  datas: CustomerTransactionView[]
}) {
  return (
    <KanbanLayout>
      {datas.map((data, index) => (
        <Kanban key={index} data={data} />
      ))}
    </KanbanLayout>
  )
}
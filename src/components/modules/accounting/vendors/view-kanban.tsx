"use client"

import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { VendorTransactionView } from "./type";
import { formatStdCurrency } from "@/utils/currency";
import { KanbanItem, KanbanLayout } from "@/components/modules/main/kanban";

const Kanban = ({
  data
}: {
  data: VendorTransactionView
}) => {
  const router = useRouter();

  return (
    <KanbanItem
      onClick={() => router.push(
        `/modules/accounting/vendors/detail/${data.pk}`
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

export default function ModuleAccountingVendorsKanbanView({
  datas
}: {
  datas: VendorTransactionView[]
}) {
  return (
    <KanbanLayout>
      {datas.map((data, index) => (
        <Kanban key={index} data={data} />
      ))}
    </KanbanLayout>
  )
}
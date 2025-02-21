"use client"

import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { KanbanItem, KanbanLayout } from "@/components/modules/main/kanban";
import { Payroll } from "./type";

const Kanban = ({
  data
}: {
  data: Payroll
}) => {
  const router = useRouter();

  return (
    <KanbanItem
      onClick={() => router.push(`/modules/hr/payrolls/detail/${data.pk}`)}
    >
      <Flex direction={'column'} gap={3}>
        <Flex direction={'column'}>
          <Text fontSize={'sm'} fontWeight={'bold'}>
            {data.batches.name}
          </Text>
          <Text
            fontSize={'xs'}
            color={useColorModeValue('gray.500', 'gray.400')}
          >
            {data.batches.status}
          </Text>
        </Flex>
      </Flex>
    </KanbanItem>
  )
}

export default function ModuleHRPayrollsKanbanView({
  datas
}: {
  datas: Payroll[]
}) {
  return (
    <KanbanLayout>
      {datas.map((data, index) => (
        <Kanban key={index} data={data} />
      ))}
    </KanbanLayout>
  )
}
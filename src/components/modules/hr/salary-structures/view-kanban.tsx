"use client"

import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { KanbanItem, KanbanLayout } from "@/components/modules/main/kanban";
import { SalaryStructure } from "./type";

const Kanban = ({
  data
}: {
  data: SalaryStructure
}) => {
  const router = useRouter();

  return (
    <KanbanItem
      onClick={() => router.push(`/modules/hr/salary-structures/detail/${data.pk}`)}
    >
      <Flex direction={'column'}>
        <Text fontSize={'sm'} fontWeight={'bold'}>
          {data.name}
        </Text>
        <Text
          fontSize={'xs'}
          color={useColorModeValue('gray.500', 'gray.400')}
        >
          {data.department.name}
        </Text>
      </Flex>
    </KanbanItem>
  )
}

export default function ModuleHRSalaryStructureKanbanView({
  datas
}: {
  datas: SalaryStructure[]
}) {
  return (
    <KanbanLayout>
      {datas.map((data, index) => (
        <Kanban key={index} data={data} />
      ))}
    </KanbanLayout>
  )
}
"use client";

import { Avatar, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { KanbanItem, KanbanLayout } from "@/components/modules/main/kanban";

interface Data {
  pk: number;
  number: string;
  name: string;
  identifier_code: string;
}

const Kanban = ({
  data
}: {
  data: Data
}) => {
  const router = useRouter();

  return (
    <KanbanItem
      onClick={() => router.push(
        `/modules/accounting/banks/detail/${data.pk}`
      )}
    >
      <Avatar
        size={'sm'}
        rounded={'sm'}
        name={data.name}
      />
      <Flex direction={'column'} gap={1} justify={'space-between'}>
        <Text fontSize={'sm'} fontWeight={'bold'}>
          {data.number}
        </Text>
        <Text
          fontSize={'xs'}
          color={useColorModeValue('gray.500', 'gray.400')}
        >
          {data.name}
        </Text>
      </Flex>
    </KanbanItem>
  );
};

export default function ModuleAccountingBanksKanbanView({
  datas
}: {
  datas: Data[];
}) {
  return (
    <KanbanLayout>
      {datas.map((data, index) => (
        <Kanban key={index} data={data} />
      ))}
    </KanbanLayout>
  )
}

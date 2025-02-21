"use client";

import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { KanbanItem, KanbanLayout } from "@/components/modules/main/kanban";

interface JournalItems {
  number: string;
  name: string;
  debit: number;
  credit: number;
}

interface Data {
  pk: number;
  entry_id: string;
  type: string;
  reference: {
    pk: number;
    entry_id: string;
  };
  date: string;
  currency: string;
  items: JournalItems[];
  total_debit: number;
  total_credit: number;
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
        `/modules/accounting/journals/detail/${data.pk}`
      )}
    >
      <Flex direction={'column'} gap={1} justify={'space-between'}>
        <Text fontSize={'sm'} fontWeight={'bold'}>
          {data.entry_id}
        </Text>
        <Text
          fontSize={'xs'}
          color={useColorModeValue('gray.500', 'gray.400')}
        >
          {data.type}
        </Text>
      </Flex>
    </KanbanItem>
  );
};

export default function ModuleAccountingJournalsKanbanView({
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

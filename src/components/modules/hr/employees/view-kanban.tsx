"use client"

import { Avatar, Flex, Text, useColorModeValue, Tag } from "@chakra-ui/react";
import { components } from "@/libs/api/schema/uam";
import { useRouter } from "next/navigation";
import { KanbanItem, KanbanLayout } from "@/components/modules/main/kanban";

const Kanban = ({
  data
}: {
  data: components["schemas"]["User"]
}) => {
  const name = `${data.first_name} ${data.last_name}`;
  const router = useRouter();

  const getEmploymentStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return 'blue';
      case "Running":
        return 'green';
      case "Terminated":
        return 'red';
      case "Extended":
        return 'yellow';
      default:
        return 'gray';
    }
  };

  return (
    <KanbanItem
      onClick={() => router.push(`/modules/hr/employees/detail/${data.pk}`)}
    >
      <Avatar
        name={name}
        size={'sm'}
        rounded={'sm'}
        src={data.image.url || undefined}
      />
      <Flex direction={'column'} gap={3}>
        <Flex direction={'column'}>
          <Text fontSize={'sm'} fontWeight={'bold'}>
            {name}
          </Text>
          <Text
            fontSize={'xs'}
            color={useColorModeValue('gray.500', 'gray.400')}
          >
            {data.group?.name}
          </Text>
        </Flex>
        <Text fontSize={'xs'}>
          {data.email}
        </Text>
        <Tag
          colorScheme={getEmploymentStatusColor(data.employment_status)}
          variant="solid"
          w={'fit-content'}
        >
          {data.employment_status}
        </Tag>
      </Flex>
    </KanbanItem>
  )
}

export default function ModuleHREmployeesKanbanView({
  datas
}: {
  datas: components["schemas"]["User"][];
}) {
  return (
    <KanbanLayout>
      {datas.map((data, index) => (
        <Kanban key={index} data={data} />
      ))}
    </KanbanLayout>
  )
}
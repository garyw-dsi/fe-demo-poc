"use client"

import { Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import ModuleAccountingJournalFormLayout from "../layout";
import { formatStandardTime } from "@/utils/parsing-time";


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
  last_modified_at: string,
  last_modified_by: {
    pk: number,
    email: string,
    first_name: string,
    last_name: string
  },
  created_at: string,
  created_by: {
    pk: number,
    email: string,
    first_name: string,
    last_name: string
  }
}


interface ViewDataProps {
  label: string;
  value: string;
}

const ViewData = ({ label, value }: ViewDataProps) => (
  <Stack spacing={0}>
    <Text fontSize="xs" color={useColorModeValue("gray.500", "gray.300")}>
      {label}
    </Text>
    <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
      {value}
    </Text>
  </Stack>
);

export default function ModuleAccountingJournalInformationDetail({
  data
}: {
  data: Data
}) {
  return (
    <ModuleAccountingJournalFormLayout title="Journal Information">
      <ViewData label="Journal Entry ID" value={data.entry_id} />
      <Flex justify={'space-between'}>
        <Stack spacing={5}>
          <ViewData label="Journal Type" value={data.type} />
          <ViewData label="Journal Reference" value={data.reference.entry_id} />
        </Stack>
        <Stack spacing={5}>
          <ViewData label="Journal Date" value={formatStandardTime(data.date)} />
          <ViewData label="Journal Currency" value={data.currency} />
        </Stack>
      </Flex>
    </ModuleAccountingJournalFormLayout>
  )
}
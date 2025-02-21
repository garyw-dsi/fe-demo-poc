"use client";

import { Stack, Text, useColorModeValue } from "@chakra-ui/react";
import ModuleAccountingAccountFormLayout from "../layout";

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

interface Data {
  pk: number,
  number: string,
  name: string,
  identifier_code: string,
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

export default function ModuleAccountingBankDetail({
  data,
}: {
  data: Data
}) {
  return (
    <ModuleAccountingAccountFormLayout title="Bank Information">
      <Stack spacing={5}>
        <ViewData label="Bank Name" value={data.name} />
        <ViewData label="Bank Number" value={data.number} />
        <ViewData label="Identifier Code" value={data.identifier_code} />
      </Stack>
    </ModuleAccountingAccountFormLayout>
  )
}
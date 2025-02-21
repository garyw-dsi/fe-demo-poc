"use client"

import { Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import ModuleHREmployeeFormLayout from "../layout";
import { AccountingHR } from "./type"
import { formatStdCurrency } from "@/utils/currency";

interface ViewDataProps {
  label: string;
  value: string;
}

const ViewData = ({ label, value }: ViewDataProps) => (
  <Flex align={'center'} gap={5}>
    <Stack spacing={0}>
      <Text fontSize="xs" color={useColorModeValue("gray.500", "gray.300")}>
        {label}
      </Text>
      <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
        {value}
      </Text>
    </Stack>
  </Flex>
);

export default function ModuleHREmployeeSalaryInformation({
  salary
}: {
  salary: AccountingHR['salary'];
}) {
  return (
    <ModuleHREmployeeFormLayout
      title="Salary Information"
    >
      <Stack spacing={5}>
        <ViewData
          label="Position"
          value={salary.position}
        />
        <ViewData
          label="Type"
          value={salary.type}
        />
        <ViewData
          label="Amount"
          value={
            formatStdCurrency({
              price: salary.amount,
              currencyISO: salary.currency.iso
            })
          }
        />
      </Stack>
    </ModuleHREmployeeFormLayout>
  )
}
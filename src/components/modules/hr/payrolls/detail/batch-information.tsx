"use client"

import { Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import ModuleHRPayrollFormLayout from "../layout"
import { PayrollDetail } from "../type";
import { formatStandardDate } from "@/utils/parsing-time";
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

export default function ModuleHRPayrollBatchInformation({
  data
}: {
  data: PayrollDetail
}) {
  return (
    <ModuleHRPayrollFormLayout
      title="Batch Information"
    >
      <Stack spacing={5}>
        <ViewData label="Batch Name" value={data.batches.name} />
        <Flex
          gap={5}
          direction={{ base: "column", md: "row" }}
        >
          <Flex w={{ base: "full", md: "50%" }}>
            <ViewData
              label="Period Start"
              value={formatStandardDate(data.batches.period_start)}
            />
          </Flex>
          <Flex w={{ base: "full", md: '50%' }}>
            <ViewData
              label="Period End"
              value={formatStandardDate(data.batches.period_end)}
            />
          </Flex>
        </Flex>
        <Flex
          gap={5}
          direction={{ base: "column", md: "row" }}
        >
          <Flex w={{ base: "full", md: "50%" }}>
            <ViewData
              label="Total Salary"
              value={formatStdCurrency({
                price: data.batches.total_salary,
                currencyISO: "IDR"
              })}
            />
          </Flex>
          <Flex w={{ base: "full", md: '50%' }}>
            <ViewData
              label="Total Employee"
              value={data.batches.total_employee.toString()}
            />
          </Flex>
        </Flex>
      </Stack>
    </ModuleHRPayrollFormLayout>
  )
}
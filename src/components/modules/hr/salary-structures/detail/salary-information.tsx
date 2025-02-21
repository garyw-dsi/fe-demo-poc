"use client"

import { Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import ModuleHRSalaryStructureFormLayout from "../layout"
import { SalaryStructure } from "../type"
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

export default function ModuleHRSalaryStructureInformation({
  data
}: {
  data: SalaryStructure
}) {
  return (
    <ModuleHRSalaryStructureFormLayout
      title="Salary Information"
    >
      <Stack spacing={5}>
        <ViewData label="Employee Type" value={data.employment_type} />
        <ViewData
          label="Basic Salary"
          value={formatStdCurrency({ price: data.basic_salary, currencyISO: "IDR" })}
        />
        <ViewData
          label="Overtime Rate (per hour)"
          value={formatStdCurrency({ price: data.overtime_rate, currencyISO: "IDR" })}
        />
        <ViewData label="Tax Calculation" value={data.tax_calculation} />
        <ViewData label="Salary Frequency" value={data.salary_frequency} />
      </Stack>
    </ModuleHRSalaryStructureFormLayout>
  )
}
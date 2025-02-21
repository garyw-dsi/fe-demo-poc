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

export default function ModuleHRSalaryStructureDeductionsInformation({
  data
}: {
  data: SalaryStructure
}) {
  return (
    <ModuleHRSalaryStructureFormLayout
      title="Deduction Information"
    >
      <Stack spacing={5}>
        <ViewData
          label="BPJS Kesehatan"
          value={formatStdCurrency({ price: data.deductions.pension, currencyISO: "IDR" })}
        />
        <ViewData
          label="Tax"
          value={formatStdCurrency({ price: data.deductions.tax, currencyISO: "IDR" })}
        />
        <ViewData
          label="Other"
          value={formatStdCurrency({ price: data.deductions.other, currencyISO: "IDR" })}
        />
      </Stack>
    </ModuleHRSalaryStructureFormLayout>
  )
}
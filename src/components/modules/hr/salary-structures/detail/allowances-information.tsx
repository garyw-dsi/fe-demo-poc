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

export default function ModuleHRSalaryStructureAllowancesInformation({
  data
}: {
  data: SalaryStructure
}) {
  return (
    <ModuleHRSalaryStructureFormLayout
      title="Allowances Information"
    >
      <Stack spacing={5}>
        <ViewData
          label="Housing"
          value={formatStdCurrency({ price: data.allowances.housing, currencyISO: "IDR" })}
        />
        <ViewData
          label="Transportation"
          value={formatStdCurrency({ price: data.allowances.transport, currencyISO: "IDR" })}
        />
        <ViewData
          label="Meal"
          value={formatStdCurrency({ price: data.allowances.meal, currencyISO: "IDR" })}
        />
        <ViewData
          label="Other"
          value={formatStdCurrency({ price: data.allowances.other, currencyISO: "IDR" })}
        />
      </Stack>
    </ModuleHRSalaryStructureFormLayout>
  )
}
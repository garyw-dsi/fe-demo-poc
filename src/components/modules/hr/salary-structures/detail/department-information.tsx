"use client"

import { Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import ModuleHRSalaryStructureFormLayout from "../layout"
import { SalaryStructure } from "../type"

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

export default function ModuleHRSalaryStructureDepartmentInformation({
  data
}: {
  data: SalaryStructure
}) {
  return (
    <ModuleHRSalaryStructureFormLayout
      title="Department Information"
    >
      <Stack spacing={5}>
        <ViewData label="Structure Code" value={data.code} />
        <ViewData label="Structure Name" value={data.name} />
        <ViewData label="Department Name" value={data.department.name} />
      </Stack>
    </ModuleHRSalaryStructureFormLayout>
  )
}
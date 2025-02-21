"use client";

import { Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { components } from "@/libs/api/schema/inventory";
import ModuleInventoryProductFormLayout from "../layout";

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

interface SectionProps {
  title: string;
  data: {
    label: string;
    value: string;
  }[];
}

const DataSection = ({ title, data }: SectionProps) => {
  return (
    <Stack spacing={2}>
      <Text as="li" fontSize="sm">
        {title}
      </Text>
      <Stack
        spacing={5}
        borderLeft="1px"
        borderColor={useColorModeValue("gray.200", "gray.700")}
        ps={5} py={2}
      >
        {data.map((item, index) => (
          <ViewData key={index}
            label={item.label}
            value={item.value}
          />
        ))}
      </Stack>
    </Stack>
  )
}

export default function ModuleInventoryProductAccountDetail({
  data,
}: {
  data: components["schemas"]["Product"];
}) {
  if (
    !data.expense_account &&
    !data.income_account
  ) {
    return null;
  }

  return (
    <ModuleInventoryProductFormLayout title="Account Information">
      <Stack spacing={2}>
        {data.expense_account && (
          <DataSection
            title="Expense Account Information"
            data={[
              { label: "Account Number", value: data.expense_account.account_number },
              { label: "Account Name", value: data.expense_account.name },
              { label: "Account Type", value: data.expense_account?.account_type || "-" },
            ]}
          />
        )}

        {data.income_account && (
          <DataSection
            title="Income Account Information"
            data={[
              { label: "Account Number", value: data.income_account.account_number },
              { label: "Account Name", value: data.income_account.name },
              { label: "Account Type", value: data.income_account?.account_type || "-" },
            ]}
          />
        )}
      </Stack>
    </ModuleInventoryProductFormLayout>
  )
}
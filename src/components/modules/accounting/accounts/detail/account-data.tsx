"use client";

import { Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import ModuleAccountingAccountFormLayout from "../layout";
import { components } from "@/libs/api/schema/accounting";
import { formatStdCurrency } from "@/utils/currency";
import ModuleAccountingAccountUpdateBalance from "../balance-update";

interface ViewDataProps {
  label: string;
  value: string;
  action?: React.ReactNode;
}

const ViewData = ({ label, value, action }: ViewDataProps) => (
  <Flex align={'center'} gap={5}>
    <Stack spacing={0}>
      <Text fontSize="xs" color={useColorModeValue("gray.500", "gray.300")}>
        {label}
      </Text>
      <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
        {value}
      </Text>
    </Stack>
    {action && action}
  </Flex>
);

interface SectionProps {
  title: string;
  data: {
    label: string;
    value: string,
    action?: React.ReactNode;
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
            action={item.action}
          />
        ))}
      </Stack>
    </Stack>
  )
}

export default function ModuleAccountingAccountDetail({
  data,
}: {
  data: components["schemas"]["Account"];
}) {
  return (
    <ModuleAccountingAccountFormLayout title="Account Information">
      <Stack spacing={2}>
        {data.parent && (
          <DataSection
            title="Parent Account"
            data={[
              { label: "Account Name", value: data.parent.name },
              { label: "Account Type", value: data.parent.account_type as string },
            ]}
          />
        )}
        <DataSection
          title="Current Account"
          data={[
            { label: "Account Number", value: data.account_number },
            { label: "Account Name", value: data.name },
            {
              label: "Currency",
              value: `${data.currency.symbol} (${data.currency.name})`,
            },
            {
              label: "Balance",
              value: formatStdCurrency({
                currencyISO: data.currency.iso,
                price: Number(data.balance),
              }),
              action: (
                <ModuleAccountingAccountUpdateBalance
                  accountId={data.pk}
                  initialAmount={Number(data.balance)}
                />
              )
            }
          ]}
        />
      </Stack>
    </ModuleAccountingAccountFormLayout>
  )
}
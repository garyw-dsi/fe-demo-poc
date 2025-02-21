import ModulePurchaseQuotationFormLayout from "../layout";
import { Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";

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

export default function ModulePurchaseQuotationDateCreate({
  requisitionDate,
}: {
  requisitionDate?: string;
}) {
  const date = new Date();
  const currentDate = date.toISOString().split('T')[0];

  return (
    <ModulePurchaseQuotationFormLayout
      title="Date"
    >
      <Flex
        justify={{ md: 'space-between' }}
        direction={{ base: 'column', md: 'row' }}
        gap={5}
      >
        <Flex w={"50%"}>
          <ViewData
            label="Quotation Date"
            value={Intl.DateTimeFormat('en-US', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }).format(new Date(currentDate))}
          />
        </Flex>
        {requisitionDate && (
          <Flex w={"50%"}>
            <ViewData
              label="Requisition Date"
              value={Intl.DateTimeFormat('en-US', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              }).format(new Date(requisitionDate))}
            />
          </Flex>
        )}
      </Flex>
    </ModulePurchaseQuotationFormLayout>
  )
}
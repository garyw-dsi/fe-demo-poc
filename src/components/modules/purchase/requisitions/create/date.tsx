import ModulePurchaseRequisitionFormLayout from "../layout";
import { Stack, Text, useColorModeValue } from "@chakra-ui/react";

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

export default function ModulePurchaseRequisitionDateCreate() {
  const date = new Date();
  const currentDate = date.toISOString().split('T')[0];

  return (
    <ModulePurchaseRequisitionFormLayout
      title="Requisition Date"
    >
      <ViewData
        label="Quotation Date"
        value={Intl.DateTimeFormat('en-US', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }).format(new Date(currentDate))}
      />
    </ModulePurchaseRequisitionFormLayout>
  )
}
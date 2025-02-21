"use client"

import { Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import ModuleHREmployeeFormLayout from "../layout"
import { AccountingHR } from "./type"
import ITable, { TD, TR } from "@/components/table"
import ITableHeader from "@/components/table/header"
import ITableBody from "@/components/table/body"
import ModuleHREmployeeSalaryInformation from "./salary-information"

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

const BankInformation = ({ banks }: { banks: AccountingHR['bank'] }) => {
  return (
    <ModuleHREmployeeFormLayout title="Bank Information">
      <Stack spacing={5}>
        <Text fontSize={'sm'} fontWeight={'semibold'}>
          Bank Details
        </Text>
        <ITable>
          <ITableHeader headers={['No', 'Bank Name', 'Bank Number']} />
          <ITableBody>
            {banks.map((bank, index) => (
              <TR key={index}>
                <TD>{index + 1}</TD>
                <TD>{bank.name}</TD>
                <TD>{bank.number}</TD>
              </TR>
            ))}
          </ITableBody>
        </ITable>
      </Stack>
    </ModuleHREmployeeFormLayout>
  )
}

const AccountInformation = ({ accounts }: { accounts: AccountingHR['accounts'] }) => {
  return (
    <ModuleHREmployeeFormLayout title="Account Information">
      <DataSection title="Account Details"
        data={[
          { label: 'Account Name', value: accounts.name },
          { label: 'Account Number', value: accounts.number },
          { label: 'Account Type', value: accounts.account_type || "-" },
        ]}
      />
    </ModuleHREmployeeFormLayout>
  )
}

export default function ModuleHREmployeeAccountingInformation({
  accounting
}: {
  accounting: AccountingHR
}) {
  return (
    <Stack spacing={5}>
      <AccountInformation accounts={accounting.accounts} />
      <ModuleHREmployeeSalaryInformation salary={accounting.salary} />
      <BankInformation banks={accounting.bank} />
    </Stack>
  )
}
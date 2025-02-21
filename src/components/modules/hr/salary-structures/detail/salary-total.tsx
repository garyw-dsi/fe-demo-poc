"use client"

import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { SalaryStructure } from "../type"
import { formatStdCurrency } from "@/utils/currency";

export default function ModuleHRSalaryStructureTotalInformation({
  data
}: {
  data: SalaryStructure
}) {
  const { housing, transport, meal, other: otherAllowances } = data.allowances
  const { pension, tax, other: otherDeductions } = data.deductions

  const totalAllowances = housing + transport + meal + otherAllowances
  const totalDeductions = pension + tax + otherDeductions
  const totalSalary = data.basic_salary + totalAllowances - totalDeductions

  return (
    <Flex justify={"end"} w={"full"} gap={5}>
      <Flex direction={"column"} gap={2} textAlign={'end'} fontSize={'sm'}>
        <Text>Basic Salary</Text>
        <Text>Allowances</Text>
        <Text>Deductions</Text>
        <Text fontWeight={"bold"}>Total Salary</Text>
      </Flex>
      <Flex direction={"column"} gap={2} align={"end"} fontSize={'sm'}>
        <Text>
          {formatStdCurrency({ price: data.basic_salary, currencyISO: "IDR" })}
        </Text>
        <Text
          color={useColorModeValue("green.500", "green.300")}
        >
          {formatStdCurrency({ price: totalAllowances, currencyISO: "IDR" })}
        </Text>
        <Text
          color={useColorModeValue("red.500", "red.300")}
        >
          {formatStdCurrency({ price: totalDeductions, currencyISO: "IDR" })}
        </Text>
        <Text fontWeight={"bold"}
          color={useColorModeValue("blue.500", "blue.300")}
        >
          {formatStdCurrency({ price: totalSalary, currencyISO: "IDR" })}
        </Text>
      </Flex>
    </Flex>
  )
}
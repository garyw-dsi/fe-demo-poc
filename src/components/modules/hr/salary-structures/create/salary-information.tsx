"use client"

import { Field, useFormikContext } from "formik"
import ModuleHRSalaryStructureFormLayout from "../layout"
import { CreateSalaryStructure } from "@/libs/yup/hr/salary-structures"
import { Flex, FormControl, Stack } from "@chakra-ui/react"
import { ModuleInput, ModuleInputErrorMessage, ModuleInputLabel, ModuleInputSelect } from "@/components/modules/input"
import ModuleCurrencySelect from "@/components/modules/core/currency/select"

export default function ModuleHRSalaryStructureSalaryCreate({
  initialCurrency
}: {
  initialCurrency: {
    value: string;
    label: string;
  }[] | undefined;
}) {
  const { errors, touched } = useFormikContext<CreateSalaryStructure>()
  return (
    <ModuleHRSalaryStructureFormLayout
      title="Salary Information"
    >
      <Stack spacing={5} w={'full'}>
        <Flex
          gap={5}
          direction={{ base: 'column', md: 'row' }}
        >
          <FormControl
            isRequired
            isInvalid={!!errors.currency && touched.currency}
          >
            <ModuleInputLabel label="Currency" />
            <ModuleCurrencySelect
              fieldName="currency"
              datas={initialCurrency}
              placeholder="Select Currency"
            />
            <ModuleInputErrorMessage value={errors.currency} />
          </FormControl>
          <FormControl
            isRequired
            isInvalid={!!errors.basic_salary && touched.basic_salary}
          >
            <ModuleInputLabel label="Basic Salary" />
            <Field as={ModuleInput} type="number" name="basic_salary" placeholder="2000000" />
            <ModuleInputErrorMessage value={errors.basic_salary} />
          </FormControl>
        </Flex>

        <Flex
          gap={5}
          direction={{ base: 'column', md: 'row' }}
        >
          <FormControl
            isRequired
            isInvalid={!!errors.salary_frequency && touched.salary_frequency}
          >
            <ModuleInputLabel label="Salary Frequency" />
            <Field as={ModuleInputSelect} name="salary_frequency" placeholder="Select Salary Frequency">
              {["Monthly", "Weekly", "Daily"].map((frequency) => (
                <option key={frequency} value={frequency}>{frequency}</option>
              ))}
            </Field>
            <ModuleInputErrorMessage value={errors.salary_frequency} />
          </FormControl>
          <FormControl
            isRequired
            isInvalid={!!errors.employment_type && touched.employment_type}
          >
            <ModuleInputLabel label="Employment Type" />
            <Field as={ModuleInputSelect} name="employment_type" placeholder="Select Employment Type">
              {["Full Time", "Part Time", "Internship"].map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </Field>
            <ModuleInputErrorMessage value={errors.employment_type} />
          </FormControl>
        </Flex>

        <Flex
          gap={5}
          direction={{ base: 'column', md: 'row' }}
        >
          <FormControl
            isRequired
            isInvalid={!!errors.tax_calculation && touched.tax_calculation}
          >
            <ModuleInputLabel label="Tax Calculation" />
            <Field as={ModuleInputSelect} name="tax_calculation" placeholder="Select Tax Calculation">
              {["Net", "Gross"].map((calculation) => (
                <option key={calculation} value={calculation}>{calculation}</option>
              ))}
            </Field>
            <ModuleInputErrorMessage value={errors.tax_calculation} />
          </FormControl>
          <FormControl
            isRequired
            isInvalid={!!errors.overtime_rate && touched.overtime_rate}
          >
            <ModuleInputLabel label="Overtime Rate (per hour)" />
            <Field as={ModuleInput} type="number" name="overtime_rate" placeholder="10000" />
            <ModuleInputErrorMessage value={errors.overtime_rate} />
          </FormControl>
        </Flex>
      </Stack>
    </ModuleHRSalaryStructureFormLayout>
  )
}
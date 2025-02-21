"use client"

import { Field, useFormikContext } from "formik"
import ModuleHRSalaryStructureFormLayout from "../layout"
import { CreateSalaryStructure } from "@/libs/yup/hr/salary-structures"
import { Flex, FormControl, Stack } from "@chakra-ui/react"
import { ModuleInput, ModuleInputErrorMessage, ModuleInputLabel } from "@/components/modules/input"

export default function ModuleHRSalaryStructureDeductionCreate() {
  const { errors, touched } = useFormikContext<CreateSalaryStructure>()
  return (
    <ModuleHRSalaryStructureFormLayout
      title="Deductions Information"
    >
      <Stack spacing={5} w={'full'}>
        <Flex
          gap={5}
          direction={{ base: 'column', md: 'row' }}
        >
          <FormControl
            isRequired
            isInvalid={!!errors.tax_deduction && touched.tax_deduction}
          >
            <ModuleInputLabel label="TAX Deduction" />
            <Field as={ModuleInput} type="number" name="tax_deduction" placeholder="TAX Deduction" />
            <ModuleInputErrorMessage value={errors.tax_deduction} />
          </FormControl>
          <FormControl
            isRequired
            isInvalid={!!errors.pension_deduction && touched.pension_deduction}
          >
            <ModuleInputLabel label="Pension Deduction" />
            <Field as={ModuleInput} type="number" name="pension_deduction" placeholder="Pension Deduction" />
            <ModuleInputErrorMessage value={errors.pension_deduction} />
          </FormControl>
        </Flex>
        <FormControl
          isRequired
          isInvalid={!!errors.other_deduction && touched.other_deduction}
        >
          <ModuleInputLabel label="Other Deduction" />
          <Field as={ModuleInput} type="number" name="other_deduction" placeholder="Other Deduction" />
          <ModuleInputErrorMessage value={errors.other_deduction} />
        </FormControl>
      </Stack>
    </ModuleHRSalaryStructureFormLayout>
  )
}
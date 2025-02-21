"use client"

import { Field, useFormikContext } from "formik"
import ModuleHRSalaryStructureFormLayout from "../layout"
import { CreateSalaryStructure } from "@/libs/yup/hr/salary-structures"
import { Flex, FormControl, Stack } from "@chakra-ui/react"
import { ModuleInput, ModuleInputErrorMessage, ModuleInputLabel } from "@/components/modules/input"

export default function ModuleHRSalaryStructureAllowanceCreate() {
  const { errors, touched } = useFormikContext<CreateSalaryStructure>()
  return (
    <ModuleHRSalaryStructureFormLayout
      title="Allowances Information"
    >
      <Stack spacing={5} w={'full'}>
        <Flex
          gap={5}
          direction={{ base: 'column', md: 'row' }}
        >
          <FormControl
            isRequired
            isInvalid={!!errors.housing_allowance && touched.housing_allowance}
          >
            <ModuleInputLabel label="Housing Allowance" />
            <Field as={ModuleInput} type="number" name="housing_allowance" placeholder="Housing Allowance" />
            <ModuleInputErrorMessage value={errors.housing_allowance} />
          </FormControl>
          <FormControl
            isRequired
            isInvalid={!!errors.transport_allowance && touched.transport_allowance}
          >
            <ModuleInputLabel label="Transport Allowance" />
            <Field as={ModuleInput} type="number" name="transport_allowance" placeholder="Transport Allowance" />
            <ModuleInputErrorMessage value={errors.transport_allowance} />
          </FormControl>
        </Flex>
        <Flex
          gap={5}
          direction={{ base: 'column', md: 'row' }}
        >
          <FormControl
            isRequired
            isInvalid={!!errors.meal_allowance && touched.meal_allowance}
          >
            <ModuleInputLabel label="Meal Allowance" />
            <Field as={ModuleInput} type="number" name="meal_allowance" placeholder="Meal Allowance" />
            <ModuleInputErrorMessage value={errors.meal_allowance} />
          </FormControl>
          <FormControl
            isRequired
            isInvalid={!!errors.other_allowance && touched.other_allowance}
          >
            <ModuleInputLabel label="Other Allowance" />
            <Field as={ModuleInput} type="number" name="other_allowance" placeholder="Other Allowance" />
            <ModuleInputErrorMessage value={errors.other_allowance} />
          </FormControl>
        </Flex>
      </Stack>
    </ModuleHRSalaryStructureFormLayout>
  )
}
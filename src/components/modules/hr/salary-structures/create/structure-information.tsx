"use client"

import { Field, useFormikContext } from "formik"
import ModuleHRSalaryStructureFormLayout from "../layout"
import { CreateSalaryStructure } from "@/libs/yup/hr/salary-structures"
import { Flex, FormControl } from "@chakra-ui/react"
import { ModuleInput, ModuleInputErrorMessage, ModuleInputLabel } from "@/components/modules/input"
import UAMGroupSelect from "@/components/modules/uam/group/select"

export default function ModuleHRSalaryStructureInformationCreate({
  initialDepartment
}: {
  initialDepartment: {
    value: string;
    label: string;
  }[] | undefined;
}) {
  const { errors, touched } = useFormikContext<CreateSalaryStructure>()
  return (
    <ModuleHRSalaryStructureFormLayout
      title="Structure Information"
    >
      <Flex
        gap={5}
        direction={{ base: 'column', md: 'row' }}
      >
        <FormControl
          isRequired
          isInvalid={!!errors.name && touched.name}
        >
          <ModuleInputLabel label="Structure Name" />
          <Field as={ModuleInput} name="name" placeholder="Structure Name" />
          <ModuleInputErrorMessage value={errors.name} />
        </FormControl>
        <FormControl
          isRequired
          isInvalid={!!errors.department_id && touched.department_id}
        >
          <ModuleInputLabel label="Department Name" />
          <UAMGroupSelect
            fieldName="department_id"
            initialOptions={initialDepartment}
            placeholder="Select Department"
          />
          <ModuleInputErrorMessage value={errors.department_id} />
        </FormControl>
      </Flex>
    </ModuleHRSalaryStructureFormLayout>
  )
}
"use client"

import { Flex, FormControl, Stack } from "@chakra-ui/react"
import ModuleAccountingBankFormLayout from "../layout"
import { Field, useFormikContext } from "formik"
import { CreateBank } from "@/libs/yup/accounting/banks"
import { ModuleInput, ModuleInputErrorMessage, ModuleInputLabel } from "@/components/modules/input"

export default function ModuleAccountingBankInformationCreate() {
  const { errors, touched } = useFormikContext<CreateBank>();

  return (
    <ModuleAccountingBankFormLayout title="Bank Information">
      <Stack spacing={5}>
        <Flex gap={5}>
          <FormControl
            isRequired
            isInvalid={!!errors.name && touched.name}
          >
            <ModuleInputLabel label="Bank Name" />
            <Field as={ModuleInput} name="name" placeholder="Bank Name" />
            <ModuleInputErrorMessage value={errors.name} />
          </FormControl>
          <FormControl
            isRequired
            isInvalid={!!errors.number && touched.number}
          >
            <ModuleInputLabel label="Bank Number" />
            <Field as={ModuleInput} name="number" placeholder="Bank Number" />
            <ModuleInputErrorMessage value={errors.number} />
          </FormControl>
        </Flex>
        <FormControl
          isInvalid={!!errors.identifier_code && touched.identifier_code}
        >
          <ModuleInputLabel label="Bank Identifier Code" />
          <Field as={ModuleInput} name="identifier_code" placeholder="Bank Identifier Code" />
          <ModuleInputErrorMessage value={errors.identifier_code} />
        </FormControl>
      </Stack>
    </ModuleAccountingBankFormLayout>
  )
}
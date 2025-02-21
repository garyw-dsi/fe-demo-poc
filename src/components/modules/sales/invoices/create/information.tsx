"use client"

import { Flex, FormControl, InputGroup, InputRightElement } from "@chakra-ui/react"
import ModuleSalesInvoiceFormLayout from "../layout"
import { ModuleInput, ModuleInputErrorMessage, ModuleInputLabel } from "@/components/modules/input"
import { Field, useFormikContext } from "formik"
import { CreateInvoice } from "@/libs/yup/sales/invoices"

export default function ModuleSalesInvoiceInformationCreate() {
  const { errors, touched } = useFormikContext<CreateInvoice>()
  return (
    <ModuleSalesInvoiceFormLayout
      title="Notes"
    >
      <Flex
        gap={5}
        w={'full'}
        direction={{ base: 'column', md: 'row' }}
      >
        <FormControl
          isInvalid={!!errors.notes && touched.notes}
        >
          <ModuleInputLabel label="Notes" />
          <Field as={ModuleInput} name="notes" placeholder="Add Invoice Note" />
          <ModuleInputErrorMessage value={errors.notes} />
        </FormControl>
        <FormControl
          isInvalid={!!errors.discount_rate && !!touched.discount_rate}
        >
          <ModuleInputLabel label="Global Discount Rate" />
          <InputGroup>
            <Field
              as={ModuleInput}
              name="discount_rate"
              placeholder="Input Global Discount Rate"
              min={0}
              max={100}
            />
            <InputRightElement width='3rem'>
              %
            </InputRightElement>
          </InputGroup>
          <ModuleInputErrorMessage value={errors.discount_rate} />
        </FormControl>
      </Flex>
    </ModuleSalesInvoiceFormLayout>
  )
}
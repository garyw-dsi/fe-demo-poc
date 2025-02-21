"use client"

import { Field, useFormikContext } from "formik";
import { Flex, FormControl, Stack } from "@chakra-ui/react";
import { ModuleInput, ModuleInputErrorMessage, ModuleInputLabel, ModuleInputSelect } from "@/components/modules/input";
import { deliveryTerms } from "@/constants/modules/sales";
import ModuleCRMSalesSelect from "@/components/modules/crm/leads/select";
import ModulePurchaseVendorSelect from "../../vendors/select";
import { type CreateRequisition } from "@/libs/yup/purchase/requisition";
import ModulePurchaseRequisitionFormLayout from "../layout";

export default function ModulePurchaseRequisitionInformationCreate() {
  const { errors, touched } = useFormikContext<CreateRequisition>();

  return (
    <ModulePurchaseRequisitionFormLayout
      title="Requisition Information"
    >
      <Stack spacing={5}>
        <Flex
          gap={5}
          w={'full'}
          direction={{ base: 'column', md: 'row' }}
        >
          <FormControl
            isRequired
            isInvalid={!!errors.customer_id && !!touched.customer_id}
          >
            <ModuleInputLabel label="Vendor" />
            <ModulePurchaseVendorSelect
              fieldName="customer_id"
              placeholder="Select Vendor"
            />
            <ModuleInputErrorMessage value={errors.customer_id} />
          </FormControl>
          <FormControl
            isInvalid={!!errors.lead && !!touched.lead}
          >
            <ModuleInputLabel label="Lead" />
            <ModuleCRMSalesSelect fieldName="lead" placeholder="Select Lead" />
            <ModuleInputErrorMessage value={errors.lead} />
          </FormControl>
        </Flex>
        <Flex
          gap={5}
          w={'full'}
          direction={{ base: 'column', md: 'row' }}
        >
          <FormControl
            isRequired
            isInvalid={!!errors.delivery_terms && !!touched.delivery_terms}
          >
            <ModuleInputLabel label="Delivery Terms" />
            <Field as={ModuleInputSelect} name="delivery_terms">
              {deliveryTerms.map((term) => (
                <option key={term} value={term}>
                  {term}
                </option>
              ))}
            </Field>
            <ModuleInputErrorMessage value={errors.delivery_terms} />
          </FormControl>
          <FormControl
            isInvalid={!!errors.discount_rate && !!touched.discount_rate}
          >
            <ModuleInputLabel label="Discount Rate" />
            <Field as={ModuleInput} name="discount_rate" placeholder="Input discount rate" />
            <ModuleInputErrorMessage value={errors.discount_rate} />
          </FormControl>
        </Flex>
      </Stack>
    </ModulePurchaseRequisitionFormLayout>
  )
}
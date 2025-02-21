"use client"

import { Field, useFormikContext } from "formik";
import ModuleSalesOrderFormLayout from "../layout";
import { Flex, FormControl, Stack } from "@chakra-ui/react";
import { ModuleInput, ModuleInputErrorMessage, ModuleInputLabel, ModuleInputSelect } from "@/components/modules/input";
import { deliveryTerms } from "@/constants/modules/sales";
import { CreateOrder } from "@/libs/yup/sales/orders";
import ModuleSalesCustomerSelect from "../../customer";

export default function ModuleSalesOrderInformationCreate({
  canAddCustomer,
  customers
}: {
  canAddCustomer: boolean;
  customers: {
    value: string;
    label: string;
  }[] | undefined;
}) {
  const { errors, touched } = useFormikContext<CreateOrder>();

  return (
    <ModuleSalesOrderFormLayout
      title="Order Information"
    >
      <Stack spacing={5}>
        {canAddCustomer && (
          <FormControl
            isRequired
            isInvalid={!!errors.customer_id && !!touched.customer_id}
          >
            <ModuleInputLabel label="Customer" />
            <ModuleSalesCustomerSelect
              fieldName={"customer_id"}
              initialOptions={customers}
              placeholder="Select Customer"
            />
            <ModuleInputErrorMessage value={errors.customer_id} />
          </FormControl>
        )}
        <Flex
          gap={5}
          w={'full'}
          direction={{ base: 'column', md: 'row' }}
        >
          <FormControl
            isRequired
            isInvalid={!!errors.delivery_term && !!touched.delivery_term}
          >
            <ModuleInputLabel label="Delivery Terms" />
            <Field as={ModuleInputSelect} name="delivery_term">
              {deliveryTerms.map((term) => (
                <option key={term} value={term}>
                  {term}
                </option>
              ))}
            </Field>
            <ModuleInputErrorMessage value={errors.delivery_term} />
          </FormControl>
          <FormControl
            isInvalid={!!errors.notes && !!touched.notes}
          >
            <ModuleInputLabel label="Notes" />
            <Field as={ModuleInput} name="notes" placeholder="Notes" />
            <ModuleInputErrorMessage value={errors.notes} />
          </FormControl>
        </Flex>
      </Stack>
    </ModuleSalesOrderFormLayout>
  )
}
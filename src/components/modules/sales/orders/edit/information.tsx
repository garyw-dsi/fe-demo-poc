"use client"

import { Field, useFormikContext } from "formik";
import ModuleSalesOrderFormLayout from "../layout";
import { Flex, FormControl, Stack } from "@chakra-ui/react";
import { ModuleInput, ModuleInputErrorMessage, ModuleInputLabel, ModuleInputSelect } from "@/components/modules/input";
import { deliveryTerms } from "@/constants/modules/sales";
import { type CreateOrder } from "@/libs/yup/sales/orders";
import ModuleSalesCustomerSelect from "../../customer";
import { components } from "@/libs/api/schema/sales";

export default function ModuleSalesOrderInformationEdit({
  initialData, customers
}: {
  initialData: components['schemas']['Order'];
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
        <Flex
          gap={5}
          w={'full'}
          direction={{ base: 'column', md: 'row' }}
        >
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
        </Flex>
        <FormControl
          isRequired
          isInvalid={!!errors.customer_id && !!touched.customer_id}
        >
          <ModuleInputLabel label="Customer" />
          <ModuleSalesCustomerSelect
            fieldName={"customer_id"}
            initialOptions={customers}
            defaultValue={{
              value: initialData.customer.pk.toString(),
              label: initialData.customer.contact.name
            }}
            placeholder="Select Customer"
          />
          <ModuleInputErrorMessage value={errors.customer_id} />
        </FormControl>
      </Stack>
    </ModuleSalesOrderFormLayout>
  )
}
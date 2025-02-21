"use client"

import { Flex, FormControl, Stack } from "@chakra-ui/react";
import { Field, useFormikContext } from "formik";
import { type CreateOrder, paymentN } from "@/libs/yup/purchase/orders";

import { components } from "@/libs/api/schema/sales";
import { paymentTerms } from "@/constants/modules/sales";

import { ModuleInput, ModuleInputErrorMessage, ModuleInputLabel, ModuleInputSelect } from "@/components/modules/input";
import ModuleCurrencySelect from "@/components/modules/core/currency/select";
import ModuleSalesOrderFormLayout from "../layout";

export default function ModulePurchaseOrderPaymentCreate({
  initialData,
  currency
}: {
  initialData?: components["schemas"]['Quotation'];
  currency: {
    value: string;
    label: string;
  }[] | undefined;
}) {
  const { errors, touched, values } = useFormikContext<CreateOrder>();

  return (
    <ModuleSalesOrderFormLayout
      title="Order Payment"
    >
      <Stack spacing={5}>
        <Flex
          gap={5}
          w={'full'}
          direction={{ base: 'column', md: 'row' }}
        >
          <FormControl
            isRequired
            isInvalid={!!errors.payment_terms && !!touched.payment_terms}
          >
            <ModuleInputLabel label="Payment Term" />
            <Field as={ModuleInputSelect} name="payment_terms">
              {paymentTerms.map((term) => (
                <option key={term} value={term}>
                  {term}
                </option>
              ))}
            </Field>
            <ModuleInputErrorMessage value={errors.payment_terms} />
          </FormControl>
          {paymentN.includes(values.payment_terms) && (
            <FormControl
              isRequired={paymentN.includes(values.payment_terms)}
              isInvalid={!!errors.payment_n && !!touched.payment_n}
            >
              <ModuleInputLabel label="Payment Due Days" />
              <Field type="number" as={ModuleInput} name="payment_n" placeholder="Input Payment Due days" />
              <ModuleInputErrorMessage value={errors.payment_n} />
            </FormControl>
          )}
        </Flex>
        <Flex
          gap={5}
          w={'full'}
          direction={{ base: 'column', md: 'row' }}
        >
          <FormControl
            isRequired
            isInvalid={!!errors.payment_dp && !!touched.payment_dp}
          >
            <ModuleInputLabel label="Payment DP" />
            <Field type="number" as={ModuleInput} name="payment_dp" placeholder="Input Payment DP" />
            <ModuleInputErrorMessage value={errors.payment_dp} />
          </FormControl>
          <FormControl
            isInvalid={!!errors.payment_dp_rate && !!touched.payment_dp_rate}
          >
            <ModuleInputLabel label="Payment DP Rate" />
            <Field as={ModuleInput} name="payment_dp_rate" placeholder="Input Payment DP Rate" />
            <ModuleInputErrorMessage value={errors.payment_dp_rate} />
          </FormControl>
          <FormControl
            isRequired
            isInvalid={!!errors.currency && touched.currency}
          >
            <ModuleInputLabel label="Currency" />
            <ModuleCurrencySelect
              datas={currency}
              fieldName="currency"
              placeholder="Select Currency..."
              defaultValues={
                (initialData && initialData.currency)
                  ? {
                    value: initialData.currency.pk.toString(),
                    label: `${initialData.currency.symbol} (${initialData.currency.name})`
                  }
                  : undefined
              }
            />
            <ModuleInputErrorMessage value={errors.currency} />
          </FormControl>
        </Flex>
      </Stack>
    </ModuleSalesOrderFormLayout>
  )
}
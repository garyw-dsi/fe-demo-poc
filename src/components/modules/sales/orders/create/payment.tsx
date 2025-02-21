"use client"

import { Field, useFormikContext } from "formik";
import ModuleSalesOrderFormLayout from "../layout";
import { Flex, FormControl, InputGroup, InputRightElement, Stack } from "@chakra-ui/react";
import { ModuleInput, ModuleInputErrorMessage, ModuleInputLabel, ModuleInputSelect } from "@/components/modules/input";
import { paymentTerms } from "@/constants/modules/sales";
import ModuleCurrencySelect from "@/components/modules/core/currency/select";
import { CreateOrder, paymentN } from "@/libs/yup/sales/orders";
import { useState } from "react";
import { components } from "@/libs/api/schema/sales";

type PaymentDpType = "nomine" | "percentage";

interface PaymentDp {
  value: PaymentDpType;
  label: string;
}

const paymentDP: PaymentDp[] = [
  { value: "nomine", label: "Nomine" },
  { value: "percentage", label: "Percentage (%)" }
];

export default function ModuleSalesOrderPaymentEdit({
  initialData,
  currency
}: {
  initialData?: components['schemas']['Quotation'];
  currency: {
    value: string;
    label: string;
  }[] | undefined;
}) {
  const { errors, touched, values, setFieldValue } = useFormikContext<CreateOrder>();
  const [paymentDpType, setPaymentDpType] = useState<PaymentDpType>("percentage");

  const onChangePaymentDpType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const type = value as PaymentDpType;

    setPaymentDpType(type);

    if (type === "nomine") {
      setFieldValue("payment_dp_rate", null);
    }

    if (type === "percentage") {
      setFieldValue("payment_dp", null);
    }
  }

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
            isInvalid={!!errors.payment_term && !!touched.payment_term}
          >
            <ModuleInputLabel label="Payment Term" />
            <Field as={ModuleInputSelect} name="payment_term">
              {paymentTerms.map((term) => (
                <option key={term} value={term}>
                  {term}
                </option>
              ))}
            </Field>
            <ModuleInputErrorMessage value={errors.payment_term} />
          </FormControl>
          {paymentN.includes(values.payment_term) && (
            <FormControl
              isRequired={paymentN.includes(values.payment_term)}
              isInvalid={!!errors.payment_n && !!touched.payment_n}
            >
              <ModuleInputLabel label="Payment Due Days" />
              <Field type="number" as={ModuleInput} name="payment_n" placeholder="Input Payment Due days" />
              <ModuleInputErrorMessage value={errors.payment_n} />
            </FormControl>
          )}
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
        <Flex
          gap={5}
          w={'full'}
          direction={{ base: 'column', md: 'row' }}
        >
          <FormControl>
            <ModuleInputLabel label="Payment DP Type" />
            <ModuleInputSelect
              onChange={onChangePaymentDpType}
              defaultValue={paymentDpType}
            >
              {paymentDP.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </ModuleInputSelect>
          </FormControl>

          {paymentDpType === "nomine" && (
            <FormControl
              isInvalid={!!errors.payment_dp && !!touched.payment_dp}
            >
              <ModuleInputLabel label="Payment DP" />
              <Field type="number" as={ModuleInput} name="payment_dp" placeholder="Input Payment DP" />
              <ModuleInputErrorMessage value={errors.payment_dp} />
            </FormControl>
          )}

          {paymentDpType === "percentage" && (
            <FormControl
              isInvalid={!!errors.payment_dp_rate && !!touched.payment_dp_rate}
            >
              <ModuleInputLabel label="Payment DP Rate" />
              <InputGroup>
                <Field
                  as={ModuleInput}
                  name="payment_dp_rate"
                  placeholder="Input Payment DP Rate"
                  min={0}
                  max={100}
                />
                <InputRightElement width='3rem'>
                  %
                </InputRightElement>
              </InputGroup>
              <ModuleInputErrorMessage value={errors.payment_dp_rate} />
            </FormControl>
          )}
          <FormControl
            isRequired
            isInvalid={!!errors.currency && touched.currency}
          >
            <ModuleInputLabel label="Currency" />
            <ModuleCurrencySelect
              datas={currency}
              fieldName="currency"
              defaultValues={initialData?.currency && (
                {
                  value: initialData?.currency.pk.toString() || "",
                  label: `${initialData?.currency.symbol} (${initialData?.currency.name})`
                })
              }
              placeholder="Select Currency..."
            />
            <ModuleInputErrorMessage value={errors.currency} />
          </FormControl>
        </Flex>
      </Stack>
    </ModuleSalesOrderFormLayout>
  )
}
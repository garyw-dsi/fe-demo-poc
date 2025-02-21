"use client"

import { Flex, FormControl, Stack, Tag } from "@chakra-ui/react";
import ModuleAccountingAccountFormLayout from "../layout";
import { ModuleInput, ModuleInputErrorMessage, ModuleInputLabel } from "@/components/modules/input";
import { Field, useFormikContext } from "formik";
import { CreateAccount } from "@/libs/yup/accounting/accounts";
import ModuleCurrencySelect from "@/components/modules/core/currency/select";
import { useState } from "react";
import { components } from "@/libs/api/schema/accounting";
import ModuleAccountingAccountSelect from "../select";
import ModuleAccountingAccountTypeEdit from "./account-type";

interface Options {
  label: string;
  value: string;
}

export default function ModuleAccountingAccountDataForm({
  initialData, currency, accounts
}: {
  initialData: components['schemas']['Account'];
  currency: Options[] | undefined;
  accounts: Options[] | undefined;
}) {
  const {
    errors,
    touched,
    values
  } = useFormikContext<CreateAccount>();
  const [parent, setParent] = useState<components['schemas']['AccountOpt'] | null>(initialData.parent);

  const handleSetParent = (
    option: components['schemas']['AccountOpt'] | null
  ) => {
    setParent(option);
  };

  const selectedCurrency = currency?.find((data) => data.value === values?.currency?.toString());

  return (
    <ModuleAccountingAccountFormLayout
      title="Account Information"
      action={
        (values.number && !isNaN(Number(values.number))) && (
          <Tag colorScheme="teal" w={'fit-content'}>
            {values.parent_id
              ? `${parent?.number}${values.number}0000`
              : `${values.number}000000`
            }
          </Tag>
        )
      }
    >
      <Stack spacing={5}>
        <ModuleAccountingAccountTypeEdit parent={parent} />

        <Flex
          gap={5}
          w={'full'}
          flexDir={{ base: 'column', md: 'row' }}
        >
          <FormControl
            isRequired
            isInvalid={!!errors.number && touched.number}
            w={{ base: 'full', md: 'sm' }}
          >
            <ModuleInputLabel label="Account Number" />
            <Field as={ModuleInput}
              placeholder="Account Number"
              name="number"
              minLength={2}
              maxLength={2}
            />
            <ModuleInputErrorMessage value={errors.number} />
          </FormControl>

          <FormControl
            isRequired
            isInvalid={!!errors.name && touched.name}
            w={'full'}
          >
            <ModuleInputLabel label="Account Name" />
            <Field as={ModuleInput} placeholder="Account Name" name="name" />
            <ModuleInputErrorMessage value={errors.name} />
          </FormControl>
        </Flex>

        <Flex
          gap={5}
          w={'full'}
          direction={{ base: 'column', md: 'row' }}
        >
          <FormControl
            isInvalid={!!errors.parent_id && touched.parent_id}
          >
            <ModuleInputLabel label="Parent Account" />
            <ModuleAccountingAccountSelect
              fieldName="parent_id"
              initialOptions={accounts}
              onSelect={handleSetParent}
              placeholder="Select parent account..."
              defaultValue={{
                value: initialData.parent?.pk.toString() || "",
                label: initialData.parent?.name || ""
              }}
            />
            <ModuleInputErrorMessage value={errors.parent_id} />
          </FormControl>

          <FormControl
            isRequired
            isInvalid={!!errors.currency && touched.currency}
          >
            <ModuleInputLabel label="Currency" />
            <ModuleCurrencySelect
              defaultValues={selectedCurrency}
              datas={currency}
              fieldName="currency"
              placeholder="Select currency..."
            />
            <ModuleInputErrorMessage value={errors.currency} />
          </FormControl>
        </Flex>
      </Stack>
    </ModuleAccountingAccountFormLayout>
  )
}
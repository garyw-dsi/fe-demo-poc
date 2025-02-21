"use client"

import { Flex, FormControl, Stack, Tag } from "@chakra-ui/react";
import ModuleAccountingAccountFormLayout from "../layout";
import { ModuleInput, ModuleInputErrorMessage, ModuleInputLabel } from "@/components/modules/input";
import { Field, useFormikContext } from "formik";
import { CreateAccount } from "@/libs/yup/accounting/accounts";
import ModuleAccountingAccountSelect from "../select";
import ModuleCurrencySelect from "@/components/modules/core/currency/select";
import { useState } from "react";
import { components } from "@/libs/api/schema/accounting";
import ModuleAccountingAccountTypeCreate from "./account-type";

interface Options {
  label: string;
  value: string;
}

export default function ModuleAccountingAccountDataForm({
  currency, accounts
}: {
  currency: Options[] | undefined;
  accounts: Options[] | undefined;
}) {
  const [parent, setParent] = useState<components['schemas']['AccountOpt'] | null>(null);
  const {
    errors,
    touched,
    values
  } = useFormikContext<CreateAccount>();

  const handleSetParent = (
    option: components['schemas']['AccountOpt'] | null
  ) => {
    setParent(option);
  };

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
      <Stack spacing={10}>
        <ModuleAccountingAccountTypeCreate parent={parent} />

        <Stack spacing={5}>
          <Flex
            gap={5}
            w={'full'}
            direction={{ base: 'column', md: 'row' }}
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
                placeholder="Select Parent Account..."
              />
              <ModuleInputErrorMessage value={errors.parent_id} />
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
              />
              <ModuleInputErrorMessage value={errors.currency} />
            </FormControl>
          </Flex>
        </Stack>
      </Stack>
    </ModuleAccountingAccountFormLayout>
  )
}
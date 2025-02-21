"use client"

import { Flex, FormControl } from "@chakra-ui/react";
import { Field, useFormikContext } from "formik";
import { ModuleInput, ModuleInputErrorMessage, ModuleInputLabel } from "@/components/modules/input";
import ModuleInventoryProductCategoryFormLayout from "../layout";
import { ProductCategory } from "@/libs/yup/inventory/product-category";
import ModuleAccountingAccountSelect from "@/components/modules/accounting/accounts/select";
import { components } from "@/libs/api/schema/inventory";

interface Props {
  initialAccounts: {
    value: string;
    label: string;
  }[] | undefined;
  initialData: components['schemas']['ProductCategory'];
}

export default function ModuleInventoryProductCategoryInformationEdit({
  initialAccounts,
  initialData,
}: Props) {
  const { errors, touched } = useFormikContext<ProductCategory>();
  return (
    <ModuleInventoryProductCategoryFormLayout
      title="Category Information"
    >
      <Flex direction={'column'} gap={5}>
        <FormControl
          isRequired
          isInvalid={!!errors.name && touched.name}
        >
          <ModuleInputLabel label="Category Name" />
          <Field
            as={ModuleInput}
            name="name"
            placeholder="Category Name"
          />
          <ModuleInputErrorMessage value={errors.name} />
        </FormControl>

        <Flex gap={5}>
          <FormControl
            isRequired
            isInvalid={!!errors.income_account_id && touched.income_account_id}
          >
            <ModuleInputLabel label="Debit Account" />
            <ModuleAccountingAccountSelect
              initialOptions={initialAccounts}
              fieldName="income_account_id"
              placeholder="Select Income Account..."
              defaultValue={{
                value: initialData.income_account.pk.toString(),
                label: initialData.income_account.name
              }}
            />
            <ModuleInputErrorMessage value={errors.income_account_id} />
          </FormControl>

          <FormControl
            isRequired
            isInvalid={!!errors.expense_account_id && touched.expense_account_id}
          >
            <ModuleInputLabel label="Credit Account" />
            <ModuleAccountingAccountSelect
              initialOptions={initialAccounts}
              fieldName="expense_account_id"
              placeholder="Select Expense Account..."
              defaultValue={{
                value: initialData.expense_account.pk.toString(),
                label: initialData.expense_account.name
              }}
            />
            <ModuleInputErrorMessage value={errors.expense_account_id} />
          </FormControl>
        </Flex>
      </Flex>
    </ModuleInventoryProductCategoryFormLayout>
  )
}
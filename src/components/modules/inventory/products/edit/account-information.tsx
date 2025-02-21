"use client"

import { Flex, FormControl } from "@chakra-ui/react";
import ModuleInventoryProductFormLayout from "../layout";
import { ModuleInputErrorMessage, ModuleInputLabel } from "@/components/modules/input";
import ModuleAccountingAccountSelect from "@/components/modules/accounting/accounts/select";
import { Products } from "@/libs/yup/inventory/product";
import { useFormikContext } from "formik";
import { components } from "@/libs/api/schema/inventory";

interface Option {
  value: string;
  label: string;
}

interface Props {
  initialAccounts: Option[] | undefined;
  initialProduct: components['schemas']['Product'];
}

export default function ModuleInventoryProductAccountInformationEdit({
  initialAccounts,
  initialProduct
}: Props) {
  const { errors, touched } = useFormikContext<Products>();

  return (
    <ModuleInventoryProductFormLayout
      title="Account Information"
    >
      <Flex gap={5}>
        <FormControl
          isInvalid={!!errors.income_account_id && touched.income_account_id}
        >
          <ModuleInputLabel label="Income Account" />
          <ModuleAccountingAccountSelect
            initialOptions={initialAccounts}
            fieldName="income_account_id"
            placeholder="Select Income Account..."
            defaultValue={{
              value: initialProduct.income_account?.pk.toString() || "",
              label: initialProduct.income_account?.name || ""
            }}
          />
          <ModuleInputErrorMessage value={errors.income_account_id} />
        </FormControl>

        <FormControl
          isInvalid={!!errors.expense_account_id && touched.expense_account_id}
        >
          <ModuleInputLabel label="Expense Account" />
          <ModuleAccountingAccountSelect
            initialOptions={initialAccounts}
            fieldName="expense_account_id"
            placeholder="Select Expense Account..."
            defaultValue={{
              value: initialProduct.expense_account?.pk.toString() || "",
              label: initialProduct.expense_account?.name || ""
            }}
          />
          <ModuleInputErrorMessage value={errors.expense_account_id} />
        </FormControl>
      </Flex>
    </ModuleInventoryProductFormLayout>
  )
}
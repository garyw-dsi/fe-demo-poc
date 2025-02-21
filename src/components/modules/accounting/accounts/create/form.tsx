"use client"

import { Alert, AlertIcon, Flex, Stack } from "@chakra-ui/react"
import { Formik } from "formik"
import { type CreateAccount, createAccountSchema } from "@/libs/yup/accounting/accounts"
import ModuleAccountingAccountSubmit from "@/components/modules/accounting/accounts/button"
import ModuleAccountingAccountDataForm from "./account-data"
import { useFormState } from "react-dom"
import { FormState } from "@/libs/api/constants"
import { createAccount } from "@/app/actions/modules/accounting/accounts"
import SuccessAlert from "@/components/alert/success"
import { useRouter } from "next/navigation"

const initialValues: CreateAccount = {
  name: "",
  number: "",
  account_type: null,
  parent_id: null,
  currency: NaN
}

/**
 * 
 * @param currency
 * @param accounts
 * @description this components need props currency
 * it use for get all the currency use in this apps.
 * 
 * @returns 
 */

interface Options {
  label: string;
  value: string;
}

export default function ModuleAccountingAccountCreateForm({
  currency, accounts
}: {
  currency: Options[] | undefined;
  accounts: Options[] | undefined;
}) {
  const router = useRouter();

  const initialState: FormState = {
    status: "idle",
    message: "",
  };

  const [createAccountState, createAccountAction] = useFormState(
    createAccount,
    initialState
  );

  const onClose = () => {
    router.push("/modules/accounting/accounts");
  };

  return (
    <Flex w={'full'}>
      <SuccessAlert
        isOpen={createAccountState?.status === "success"}
        title="Account Created"
        description={createAccountState.message}
        onClose={onClose}
      />

      <Formik
        initialValues={initialValues}
        validationSchema={createAccountSchema}
        onSubmit={(values) => {
          console.log(values)
          const formData = new FormData();

          formData.append("name", values.name);
          formData.append("number", values.number.toString());

          if (!values.parent_id && values.account_type) {
            formData.append("account_type", values.account_type.toString());
          }

          formData.append("currency", values.currency.toString());

          if (values.parent_id) {
            formData.append("parent_id", String(values.parent_id));
          }

          createAccountAction(formData);
        }}
      >
        {({ handleSubmit }) => (
          <Stack as="form"
            action={() => handleSubmit()}
            w={'full'}
            spacing={5}
          >

            {createAccountState?.status === "error" && (
              <Alert status={"error"}
                fontSize={{ base: "sm", md: "xs" }}
                rounded={"md"}
                variant={'solid'}
              >
                <AlertIcon />
                {createAccountState.message}
              </Alert>
            )}
            <ModuleAccountingAccountDataForm
              currency={currency}
              accounts={accounts}
            />
            <Flex justify={'end'}>
              <ModuleAccountingAccountSubmit />
            </Flex>
          </Stack>
        )}
      </Formik>
    </Flex>
  )
}

"use client"

import { Alert, AlertIcon, Flex, Stack } from "@chakra-ui/react"
import { Formik } from "formik"
import { createAccountSchema } from "@/libs/yup/accounting/accounts"
import ModuleAccountingAccountSubmit from "@/components/modules/accounting/accounts/button"
import ModuleAccountingAccountEditDataForm from "./account-data"
import { useFormState } from "react-dom"
import { FormState } from "@/libs/api/constants"
import { updateAccount } from "@/app/actions/modules/accounting/accounts"
import SuccessAlert from "@/components/alert/success"
import { useRouter } from "next/navigation"
import { components } from "@/libs/api/schema/accounting"

interface Option {
  label: string;
  value: string;
}

interface ModuleAccountingAccountEditForm {
  initialData: components['schemas']['Account'];
  currency: Option[] | undefined;
  accounts: Option[] | undefined;
}

export default function ModuleAccountingAccountEditForm({
  initialData,
  currency,
  accounts
}: ModuleAccountingAccountEditForm) {
  const router = useRouter();

  const initialState: FormState = {
    status: "idle",
    message: "",
  };

  const [editAccountState, editAccountAction] = useFormState(
    updateAccount,
    initialState
  );

  const onClose = () => {
    router.push("/modules/accounting/accounts");
  };

  return (
    <Flex w={'full'}>
      <SuccessAlert
        isOpen={editAccountState?.status === "success"}
        title="Account Updated"
        description={editAccountState.message}
        onClose={onClose}
      />

      <Formik
        initialValues={{
          name: initialData.name,
          number: initialData.number,
          account_type: initialData.account_type,
          parent_id: initialData.parent?.pk,
          currency: initialData.currency.pk
        }}
        validationSchema={createAccountSchema}
        onSubmit={(values) => {
          console.log(values)
          const formData = new FormData();

          formData.append("name", values.name);
          formData.append("number", values.number.toString());

          if (!values.parent_id && values.account_type) {
            formData.append("account_type", values.account_type.toString());
          }

          if (values.parent_id) {
            formData.append("parent_id", String(values.parent_id));
          }

          formData.append("account_id", String(initialData.pk));
          formData.append("currency", values.currency.toString());

          editAccountAction(formData);
        }}
      >
        {({ handleSubmit }) => (
          <Stack as="form"
            action={() => handleSubmit()}
            w={'full'}
            spacing={5}
          >

            {editAccountState?.status === "error" && (
              <Alert status={"error"}
                fontSize={{ base: "sm", md: "xs" }}
                rounded={"md"}
                variant={'solid'}
              >
                <AlertIcon />
                {editAccountState.message}
              </Alert>
            )}
            <ModuleAccountingAccountEditDataForm
              currency={currency}
              accounts={accounts}
              initialData={initialData}
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

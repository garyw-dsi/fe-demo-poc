"use client"

import { FormState } from "@/libs/api/constants";
import { createBankSchema, type CreateBank } from "@/libs/yup/accounting/banks";
import { Alert, AlertIcon, Flex, Stack } from "@chakra-ui/react";
import { Formik } from "formik";
import ModuleAccountingBankSubmit from "../button";
import ModuleAccountingBankInformationCreate from "./bank-information";
import { useFormState } from "react-dom";
import { createBank } from "@/app/actions/modules/accounting/banks";
import SuccessAlert from "@/components/alert/success";
import { useRouter } from "next/navigation";

const initialValues: CreateBank = {
  name: "",
  number: "",
  identifier_code: null,
}

export default function ModuleAccountingBankCreateForm() {
  const router = useRouter();

  const initialState: FormState = {
    status: "idle",
    message: "",
  }

  const [createBankState, createBankAction] = useFormState(
    createBank,
    initialState
  );

  const onClose = () => {
    router.push("/modules/accounting/banks");
  };

  return (
    <Flex w={'full'}>
      <SuccessAlert
        isOpen={createBankState?.status === "success"}
        title="Bank Created"
        description={createBankState.message}
        onClose={onClose}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={createBankSchema}
        onSubmit={(values) => {
          console.log(values);
          const formData = new FormData();

          formData.append('name', values.name);
          formData.append('number', values.number);

          if (values.identifier_code) {
            formData.append('identifier_code', values.identifier_code);
          }

          createBankAction(formData);
        }}
      >
        {({ handleSubmit }) => (
          <Stack as="form"
            action={() => handleSubmit()}
            w={'full'}
            spacing={5}
          >
            {createBankState?.status === "error" && (
              <Alert status={"error"}
                fontSize={{ base: "sm", md: "xs" }}
                rounded={"md"}
                variant={'solid'}
              >
                <AlertIcon />
                {createBankState.message}
              </Alert>
            )}
            <ModuleAccountingBankInformationCreate />
            <Flex justify={'end'}>
              <ModuleAccountingBankSubmit />
            </Flex>
          </Stack>
        )}
      </Formik>
    </Flex>
  )
}
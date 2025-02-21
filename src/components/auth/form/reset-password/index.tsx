"use client"

import { Alert, AlertIcon, Flex, FormControl } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Field, Formik } from "formik";
import { useFormState } from "react-dom";

import { requestResetPasswordSchema } from "@/libs/yup/auth";
import { AuthInput, AuthInputErrorMessage, AuthInputLabel } from "@/components/auth/input";
import { FormState } from "@/libs/api/constants";
import { requestResetPassword } from "@/app/actions/user";

import AuthRequestResetPasswordButton from "@/components/auth/form/reset-password/button";
import SuccessAlert from "@/components/alert/success";

export default function AuthRequestResetPasswordForm() {
  const router = useRouter();

  const initialState: FormState = {
    message: "",
    status: "idle"
  }

  const [
    requestResetPasswordState,
    requestResetPasswordAction
  ] = useFormState(
    requestResetPassword,
    initialState
  )

  const onClose = () => {
    router.push("/auth/login");
  }

  return (
    <Formik
      initialValues={{
        email: ''
      }}
      validationSchema={requestResetPasswordSchema}
      onSubmit={(values) => {
        const formData = new FormData();
        formData.append('email', values.email);

        requestResetPasswordAction(formData);
      }}
    >
      {({ handleSubmit, errors, touched }) => (
        <form action={() => handleSubmit()}>
          <SuccessAlert
            isOpen={requestResetPasswordState.status === "success"}
            title="Your Request has been processed"
            description={requestResetPasswordState.message}
            onClose={onClose}
          />

          <Flex direction={'column'} gap={6}>
            {requestResetPasswordState.status === "error" && (
              <Alert status={"error"}
                fontSize={{ base: "sm", md: "xs" }}
                rounded={"md"}
                variant={'solid'}
              >
                <AlertIcon />
                {requestResetPasswordState.message}
              </Alert>
            )}
            <FormControl
              isRequired
              isInvalid={!!errors.email && touched.email}
            >
              <AuthInputLabel label="Email" />
              <Field as={AuthInput} name="email" type="email" />
              <AuthInputErrorMessage value={errors.email} />
            </FormControl>
            <AuthRequestResetPasswordButton />
          </Flex>
        </form>
      )}
    </Formik>
  )
}
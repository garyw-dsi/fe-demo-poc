"use client"

import { Alert, AlertIcon, Flex, FormControl } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Field, Formik } from "formik";
import { useFormState } from "react-dom";

import { resetPasswordSchema } from "@/libs/yup/auth";
import { AuthInputErrorMessage, AuthInputLabel, AuthInputPassword } from "@/components/auth/input";
import { FormState } from "@/libs/api/constants";
import { userRegistration } from "@/app/actions/user";

import SuccessAlert from "@/components/alert/success";
import UserResetPasswordButton from "@/components/user/reset-password/button";

export default function UserRegistrationForm({ token }: { token: string }) {
  const router = useRouter();

  const initialState: FormState = {
    message: "",
    status: "idle"
  }

  const [
    userRegistrationState,
    userRegistrationAction
  ] = useFormState(
    userRegistration,
    initialState
  )

  const onClose = () => {
    router.push("/auth/login");
  }

  return (
    <Formik
      initialValues={{
        password: '',
        password_confirmation: ''
      }}
      validationSchema={resetPasswordSchema}
      onSubmit={(values) => {
        const formData = new FormData();
        formData.append('password', values.password);
        formData.append('token', token as string);

        userRegistrationAction(formData);
      }}
    >
      {({ handleSubmit, errors, touched }) => (
        <form action={() => handleSubmit()}>
          <SuccessAlert
            isOpen={userRegistrationState.status === "success"}
            title="Success"
            description={userRegistrationState.message}
            onClose={onClose}
          />

          <Flex direction={'column'} gap={6}>
            {userRegistrationState.status === "error" && (
              <Alert status={"error"}
                fontSize={{ base: "sm", md: "xs" }}
                rounded={"md"}
                variant={'solid'}
              >
                <AlertIcon />
                {userRegistrationState.message}
              </Alert>
            )}
            <FormControl
              isRequired
              isInvalid={!!errors.password && touched.password}
            >
              <AuthInputLabel label="New Password" />
              <Field as={AuthInputPassword} name="password" />
              <AuthInputErrorMessage value={errors.password} />
            </FormControl>
            <FormControl
              isRequired
              isInvalid={!!errors.password_confirmation && touched.password_confirmation}
            >
              <AuthInputLabel label="New Password Confirmation" />
              <Field as={AuthInputPassword} name="password_confirmation" />
              <AuthInputErrorMessage value={errors.password_confirmation} />
            </FormControl>
            <UserResetPasswordButton />
          </Flex>
        </form>
      )}
    </Formik>
  )
}
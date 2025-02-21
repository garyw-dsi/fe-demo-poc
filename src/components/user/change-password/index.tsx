"use client"

import { Alert, AlertIcon, Flex, FormControl } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Field, Formik } from "formik";
import { useFormState } from "react-dom";

import { changePasswordSchema } from "@/libs/yup/auth";
import { AuthInputErrorMessage, AuthInputLabel, AuthInputPassword } from "@/components/auth/input";
import { FormState } from "@/libs/api/constants";
import { userChangePassword } from "@/app/actions/user";

import SuccessAlert from "@/components/alert/success";
import UserChangePasswordButton from "@/components/user/change-password/button";

export default function UserChangePasswordForm({ token }: { token: string }) {
  const router = useRouter();

  const initialState: FormState = {
    message: "",
    status: "idle"
  }

  const [
    userChangePasswordState,
    userChangePasswordAction
  ] = useFormState(
    userChangePassword,
    initialState
  )

  const onClose = () => {
    router.push("/auth/login");
  }

  return (
    <Formik
      initialValues={{
        old_password: '',
        password: '',
        password_confirmation: ''
      }}
      validationSchema={changePasswordSchema}
      onSubmit={(values) => {
        const formData = new FormData();
        formData.append('token', token as string);

        formData.append('old_password', values.old_password)
        formData.append('new_password', values.password);

        userChangePasswordAction(formData);
      }}
    >
      {({ handleSubmit, errors, touched }) => (
        <form action={() => handleSubmit()}>
          <SuccessAlert
            isOpen={userChangePasswordState.status === "success"}
            title="Success"
            description={userChangePasswordState.message}
            onClose={onClose}
          />

          <Flex direction={'column'} gap={6}>
            {userChangePasswordState.status === "error" && (
              <Alert status={"error"}
                fontSize={{ base: "sm", md: "xs" }}
                rounded={"md"}
                variant={'solid'}
              >
                <AlertIcon />
                {userChangePasswordState.message}
              </Alert>
            )}
            <FormControl
              isRequired
              isInvalid={!!errors.old_password && touched.old_password}
            >
              <AuthInputLabel label="Old Password" />
              <Field as={AuthInputPassword} name="old_password" />
              <AuthInputErrorMessage value={errors.old_password} />
            </FormControl>
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
            <UserChangePasswordButton />
          </Flex>
        </form>
      )}
    </Formik>
  )
}
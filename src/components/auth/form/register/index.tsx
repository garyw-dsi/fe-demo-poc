"use client"

import { Alert, AlertIcon, Flex, FormControl } from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { useFormState } from "react-dom";

import { registerSchema } from "@/libs/yup/auth";
import { AuthInput, AuthInputErrorMessage, AuthInputLabel, AuthInputPassword } from "@/components/auth/input";
import { signUp } from "@/app/actions/auth";
import { FormState } from "@/libs/api/constants";

import AuthRegisterButton from "@/components/auth/form/register/button";
import SuccessAlert from "@/components/alert/success";
import { useRouter } from "next/navigation";

export default function AuthRegisterForm() {
  const router = useRouter();

  const initialSignUpState: FormState = {
    message: "",
    status: "idle"
  }

  const [signUpState, signUpAction] = useFormState(
    signUp,
    initialSignUpState
  )

  const onClose = () => {
    router.push("/auth/login");
  }

  return (
    <Formik
      initialValues={{
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }}
      validationSchema={registerSchema}
      onSubmit={(values) => {
        const formData = new FormData();

        formData.append('first_name', values.first_name);
        formData.append('last_name', values.last_name);
        formData.append('email', values.email);
        formData.append('password', values.password);

        signUpAction(formData);
      }}
    >
      {({ handleSubmit, errors, touched }) => (
        <form action={() => handleSubmit()}>
          <SuccessAlert
            isOpen={signUpState.status === "success"}
            title="Register Successfully"
            description="Please check your email to verify your account, for fully access to our platform."
            onClose={onClose}
            closeLabel="Login"
          />

          <Flex direction={'column'} gap={6}>
            {signUpState.status === "error" && (
              <Alert status={"error"}
                fontSize={{ base: "sm", md: "xs" }}
                rounded={"md"}
                variant={'solid'}
              >
                <AlertIcon />
                {signUpState.message}
              </Alert>
            )}

            <FormControl
              isRequired
              isInvalid={!!errors.first_name && touched.first_name}
            >
              <AuthInputLabel label="First Name" />
              <Field as={AuthInput} name="first_name" type="text" />
              <AuthInputErrorMessage value={errors.first_name} />
            </FormControl>
            <FormControl
              isRequired
              isInvalid={!!errors.last_name && touched.last_name}
            >
              <AuthInputLabel label="Last Name" />
              <Field as={AuthInput} name="last_name" type="text" />
              <AuthInputErrorMessage value={errors.last_name} />
            </FormControl>
            <FormControl
              isRequired
              isInvalid={!!errors.email && touched.email}
            >
              <AuthInputLabel label="Email" />
              <Field as={AuthInput} name="email" type="email" />
              <AuthInputErrorMessage value={errors.email} />
            </FormControl>
            <FormControl
              isRequired
              isInvalid={!!errors.password && touched.password}
            >
              <AuthInputLabel label="Password" />
              <Field as={AuthInputPassword} name="password" />
              <AuthInputErrorMessage value={errors.password} />
            </FormControl>
            <FormControl
              isRequired
              isInvalid={!!errors.password_confirmation && touched.password_confirmation}
            >
              <AuthInputLabel label="Password Confirmation" />
              <Field as={AuthInputPassword} name="password_confirmation" />
              <AuthInputErrorMessage value={errors.password_confirmation} />
            </FormControl>
          </Flex>
          <AuthRegisterButton />
        </form>
      )}
    </Formik>
  )
}
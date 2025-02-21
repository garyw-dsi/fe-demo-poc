"use client"

import { useRouter } from "next/navigation";
import { Checkbox, Flex, FormControl, Text, useToast } from "@chakra-ui/react";
import { Field, FieldProps, Form, Formik } from "formik";
import { signIn } from "next-auth/react";

import { loginSchema } from "@/libs/yup/auth";
import { AuthInput, AuthInputErrorMessage, AuthInputLabel, AuthInputPassword } from "@/components/auth/input";
import AuthLoginButton from "./button";

export default function AuthLoginForm() {
  const toast = useToast();
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        rememberMe: false,
      }}
      validationSchema={loginSchema}
      onSubmit={async (values) => {
        const response = await signIn('credentials', {
          email: values.email,
          password: values.password,
          rememberMe: values.rememberMe,
          redirect: false,
        });


        if (response?.ok) {
          router.replace("/modules");
        }

        if (response?.error) {
          return toast({
            title: 'Error',
            description: response.error,
            status: 'error',
          });
        }
      }}
    >
      {({ handleSubmit, errors, touched }) => (
        <Form onSubmit={handleSubmit}>
          <Flex direction={'column'} gap={6}>
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
            <FormControl>
              <Field name="rememberMe">
                {({ field }: FieldProps) => (
                  <Flex align="center">
                    <Checkbox {...field} isChecked={field.value}>
                      <Text
                        fontSize={{ base: 'sm', md: 'xs' }}
                        fontWeight={'medium'}
                      >
                        Remember Me
                      </Text>
                    </Checkbox>
                  </Flex>
                )}
              </Field>
            </FormControl>
          </Flex>
          <AuthLoginButton />
        </Form>
      )}
    </Formik>
  )
}
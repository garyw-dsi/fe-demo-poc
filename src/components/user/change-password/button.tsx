"use client"

import { Flex } from "@chakra-ui/react";
import { AuthPrimaryButton } from "@/components/auth/button";
import { useFormStatus } from "react-dom";
import { useFormikContext } from "formik";

export default function UserChangePasswordButton() {
  const { errors, touched } = useFormikContext();
  const { pending } = useFormStatus();

  return (
    <Flex direction={'column'} gap={6} mt={8}>
      <AuthPrimaryButton type="submit"
        loadingText="loading..."
        isLoading={pending}
        isDisabled={
          Object.keys(errors).length > 0 ||
          Object.keys(touched).length === 0
        }
      >
        Submit
      </AuthPrimaryButton>
    </Flex>
  )
}
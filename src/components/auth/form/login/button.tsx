"use client"

import { Flex } from "@chakra-ui/react";
import { AuthLinkButton, AuthPrimaryButton } from "@/components/auth/button";
import { useRouter } from "next/navigation";
import { useFormikContext } from "formik";

const links = [
  {
    label: "Don't have an account?",
    href: "/auth/register"
  },
  {
    label: "Reset Password",
    href: "/auth/reset-password"
  }
] as const;

export default function AuthLoginButton() {
  const { isSubmitting, errors, touched } = useFormikContext();
  const router = useRouter();

  return (
    <Flex direction={'column'} gap={6} mt={8}>
      <AuthPrimaryButton
        type="submit"
        loadingText="Logging in..."
        isLoading={isSubmitting}
        isDisabled={
          Object.keys(errors).length > 0 ||
          Object.keys(touched).length === 0
        }
      >
        Log in
      </AuthPrimaryButton>
      <Flex justify={'space-between'} align={'center'}>
        {links.map((link, index) => (
          <AuthLinkButton key={index}
            onClick={() => router.push(link.href)}
          >
            {link.label}
          </AuthLinkButton>
        ))}
      </Flex>
    </Flex>
  )
}
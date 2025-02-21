"use client"

import { Flex } from "@chakra-ui/react";
import { AuthLinkButton, AuthPrimaryButton } from "@/components/auth/button";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { useFormikContext } from "formik";

const links = [
  {
    label: 'Already have an account?',
    href: '/auth/login'
  }
] as const;

export default function AuthRegisterButton() {
  const router = useRouter();
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
        Sign Up
      </AuthPrimaryButton>
      <Flex justify={'center'} align={'center'}>
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
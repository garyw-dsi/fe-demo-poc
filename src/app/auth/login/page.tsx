import { Divider, Flex } from "@chakra-ui/react";

import AuthHeader from "@/components/auth/header";
import AuthLoginForm from "@/components/auth/form/login";

export const dynamic = 'force-dynamic';

export default function LoginPage() {
  return (
    <Flex direction={'column'} gap={6} flex={1}>
      <AuthHeader />
      <Divider />
      <AuthLoginForm />
    </Flex>
  )
}
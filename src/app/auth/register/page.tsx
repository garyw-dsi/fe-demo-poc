import { Divider, Flex } from "@chakra-ui/react";

import AuthHeader from "@/components/auth/header";
import AuthRegisterForm from "@/components/auth/form/register";

export const dynamic = 'force-dynamic';

export default function RegisterPage() {
  return (
    <Flex direction={'column'} gap={6} flex={1}>
      <AuthHeader />
      <Divider />
      <AuthRegisterForm />
    </Flex>
  )
}
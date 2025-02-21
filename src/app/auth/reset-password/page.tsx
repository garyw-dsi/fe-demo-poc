import { Divider, Flex, Text } from "@chakra-ui/react";

import AuthHeader from "@/components/auth/header";
import AuthRequestResetPasswordForm from "@/components/auth/form/reset-password";

export const dynamic = 'force-dynamic';

export default function RequestResetPasswordPage() {
  return (
    <Flex direction={'column'} gap={6} flex={1}>
      <AuthHeader />
      <Divider />
      <Text
        fontSize={'sm'}
        textAlign={'center'}
        fontWeight={'bold'}
      >
        Reset Password
      </Text>
      <AuthRequestResetPasswordForm />
    </Flex>
  )
}
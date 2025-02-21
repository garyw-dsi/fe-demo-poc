import { redirect } from "next/navigation";
import { Divider, Flex, Text } from "@chakra-ui/react";
import { checkUserVerificationToken, verificationUser } from "@/app/actions/user";

import UserVerificationSuccess from "@/components/user/registration-verification/success";
import UserVerificationError from "@/components/user/registration-verification/error";
import UserVerificationLayout from "@/components/user/registration-verification/layout";

import AuthLayout from "@/layouts/auth";
import AuthHeader from "@/components/auth/header";
import UserResetPasswordForm from "@/components/user/reset-password";
import UserChangePasswordForm from "@/components/user/change-password";
import UserRegistrationForm from "@/components/user/user-registration";

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: {
    token: string;
  }
}

interface AuthFormLayoutProps {
  title: string;
  children: React.ReactNode;
}

const AuthFormLayout = ({ title, children }: AuthFormLayoutProps) => (
  <AuthLayout>
    <Flex direction={'column'} gap={6} flex={1}>
      <AuthHeader />
      <Divider />
      <Text
        fontSize={'sm'}
        textAlign={'center'}
        fontWeight={'bold'}
      >
        {title}
      </Text>
      {children}
    </Flex>
  </AuthLayout>
)

export default async function UserVerificationPage({
  searchParams
}: PageProps) {
  const token = searchParams.token;

  if (!token) {
    redirect("/modules");
  }

  const {
    status,
    data,
    message
  } = await checkUserVerificationToken({ token });

  if (status === 'error') {
    return (
      <UserVerificationLayout>
        <UserVerificationError message={message} />
      </UserVerificationLayout>
    )
  }

  if (
    data?.scope === 'Verification' ||
    data?.scope === 'Registration'
  ) {
    const registration = await verificationUser({ token });

    return (
      <UserVerificationLayout>
        {registration.status === 'success'
          ? <UserVerificationSuccess message={registration.message} />
          : <UserVerificationError message={registration.message} />
        }
      </UserVerificationLayout>
    )
  }

  if (data?.scope === 'New User') {
    return (
      <AuthFormLayout title="Create New Password">
        <UserRegistrationForm token={token} />
      </AuthFormLayout>
    )
  }

  if (data?.scope === 'Reset Password') {
    return (
      <AuthFormLayout title="Reset Password">
        <UserResetPasswordForm token={token} />
      </AuthFormLayout>
    )
  }

  if (data?.scope === 'Change Password') {
    return (
      <AuthFormLayout title="Change Password">
        <UserChangePasswordForm token={token} />
      </AuthFormLayout>
    )
  }

  return null;
}
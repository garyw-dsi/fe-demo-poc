"use client"

import { requestVerificationLink } from "@/app/actions/user";
import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Flex, Text, useToast } from "@chakra-ui/react"
import { useState } from "react";

export default function HomeUserNotVerification() {
  const toast = useToast({
    size: 'xs',
  });
  const [loading, setLoading] = useState<boolean>(false);

  const onRequestVerificationLink = async () => {
    try {
      setLoading(true);

      const { status, message } = await requestVerificationLink();

      if (status === 'success') {
        return toast({
          title: <Text fontSize="sm">Verification link requested</Text>,
          description: <Text fontSize="xs">{message}</Text>,
          status: "success"
        })
      } else {
        return toast({
          title: <Text fontSize="sm">Failed to request verification link</Text>,
          description: <Text fontSize="xs">{message}</Text>,
          status: "error"
        })
      }
    } catch {
      return toast({
        title: <Text fontSize="sm">Failed to request verification link</Text>,
        description: <Text fontSize="xs">Something went wrong</Text>,
        status: "error"
      })
    } finally {
      setLoading(false);
    }
  }

  return (
    <Alert
      status='warning'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      py={12}
      rounded={'md'}
    >
      <Flex direction={'column'} align={'center'} gap={1} mb={3}>
        <AlertIcon boxSize='35px' mr={0} />
        <AlertTitle mt={4} mb={1} fontSize={{ base: "sm", md: "md" }}>
          Your account is not verified yet.
        </AlertTitle>
        <AlertDescription maxWidth='sm' fontSize={'xs'}>
          Please verify your account to access all features.
          <i> Verification link will be sent to your email.</i>
        </AlertDescription>
      </Flex>
      <Button
        mt={4}
        colorScheme='blue'
        variant='outline'
        size={'sm'}
        fontSize={'xs'}
        onClick={onRequestVerificationLink}
        isLoading={loading}
        loadingText="Requesting..."
      >
        Request Verification Link
      </Button>
    </Alert>
  )
}
"use client"

import { requestVerificationLink } from "@/app/actions/user";
import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Flex, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";

export default function UserNotVerificationAlert() {
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
    <Alert status='warning' variant="top-accent">
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify={{ md: "space-between" }}
        w={'full'}
      >
        <Flex align={'center'}>
          <AlertIcon />
          <AlertTitle
            fontSize={{ base: 'sm', md: 'sm' }}
          >
            Your account is not verified yet.
          </AlertTitle>
        </Flex>

        <AlertDescription
          fontSize={{ base: 'xs', md: 'xs' }}
        >
          Please verify your account to access the application.
        </AlertDescription>

        <Flex mt={{ base: 4, md: 0 }}>
          <Button
            variant={'link'}
            size={'sm'}
            fontSize={'xs'}
            color={'dark'}
            onClick={onRequestVerificationLink}
            isLoading={loading}
            loadingText="Requesting..."
          >
            Request verification link
          </Button>
        </Flex>
      </Flex>
    </Alert>
  )
}
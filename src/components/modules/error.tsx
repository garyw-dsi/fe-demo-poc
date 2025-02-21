"use client";

import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Icon, Stack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { IoMdRefresh } from "react-icons/io";
import { useTransition } from "react";

export default function ModuleError({
  message
}: {
  message: string;
}) {
  const router = useRouter();
  const [isPending, startRefresh] = useTransition();

  const onRefresh = () => {
    startRefresh(() => {
      router.refresh();
    });
  }

  return (
    <Alert
      status='error'
      variant='subtle'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      rounded={'lg'}
      py={8}
      h={'fit-content'}
      maxW={'2xl'}
      m={'auto'}
      gap={8}
    >
      <Stack align={'center'} spacing={8}>
        <AlertIcon boxSize='40px' mr={0} />
        <Stack spacing={1}>
          <AlertTitle fontSize={{ base: 'md', md: 'md' }}>
            Error while fetching data
          </AlertTitle>
          <AlertDescription
            maxWidth='sm'
            fontSize={{ base: 'sm', md: 'xs' }}
          >
            {message}
          </AlertDescription>
        </Stack>
      </Stack>
      <Button
        onClick={onRefresh}
        leftIcon={
          <Icon as={IoMdRefresh} boxSize={4} />
        }
        size={'sm'}
        fontSize={'xs'}
        loadingText={'Refreshing...'}
        isLoading={isPending}
      >
        Refresh
      </Button>
    </Alert>
  )
}

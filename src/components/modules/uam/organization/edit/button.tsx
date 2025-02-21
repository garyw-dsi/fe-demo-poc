"use client"

import { Button, Flex } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

export default function ModuleUAMOrganizationSubmit() {
  const router = useRouter();
  const { errors, touched } = useFormikContext();
  const { pending } = useFormStatus();

  return (
    <Flex align={'center'} gap={3}>
      <Button
        size={'sm'}
        fontSize={'xs'}
        isDisabled={pending}
        onClick={() => router.push("/modules/uam/organization")}
      >
        Back
      </Button>
      <Button type="submit"
        isLoading={pending}
        loadingText="loading..."
        colorScheme="blue"
        size={'sm'}
        fontSize={'xs'}
        isDisabled={
          !!Object.keys(errors).length ||
          !Object.keys(touched).length
        }
      >
        Submit
      </Button>
    </Flex>
  )
}
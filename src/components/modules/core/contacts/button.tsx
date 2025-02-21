"use client"

import { type CreateContact } from "@/libs/yup/core/contacts";
import { Button, Flex } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import { useFormStatus } from "react-dom";

export default function ModuleContactSubmit() {
  const { errors, touched } = useFormikContext<CreateContact>();
  const { pending } = useFormStatus();

  return (
    <Flex align={'center'} gap={3}>
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
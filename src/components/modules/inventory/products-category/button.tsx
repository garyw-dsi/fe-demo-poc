"use client"

import { Button, Flex } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import { useFormStatus } from "react-dom";

export default function ModuleInventoryProductCategorySubmit() {
  const { errors, touched } = useFormikContext();
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
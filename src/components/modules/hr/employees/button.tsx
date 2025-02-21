"use client"

import { CreateEmployee } from "@/libs/yup/hr/employees";
import { Button } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import { useFormStatus } from "react-dom";

export default function ModuleHREmployeeSubmit() {
  const { errors, touched } = useFormikContext<CreateEmployee>();
  const { pending } = useFormStatus();

  return (
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
  )
}
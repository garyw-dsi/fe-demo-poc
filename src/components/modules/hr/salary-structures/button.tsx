"use client"

import { CreateSalaryStructure } from "@/libs/yup/hr/salary-structures";
import { Button } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import { useFormStatus } from "react-dom";

export default function ModuleHRSalaryStructureSubmit() {
  const { errors, touched } = useFormikContext<CreateSalaryStructure>();
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
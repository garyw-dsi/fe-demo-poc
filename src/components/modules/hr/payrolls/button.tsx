"use client"


import { CreatePayroll } from "@/libs/yup/hr/payrolls";
import { Button, Flex } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import { useFormStatus } from "react-dom";

export default function ModuleHRPayrollSubmit() {
  const { errors, touched } = useFormikContext<CreatePayroll>();
  const { pending } = useFormStatus();
  console.log(errors)
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
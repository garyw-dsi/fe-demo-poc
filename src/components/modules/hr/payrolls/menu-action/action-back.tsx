"use client"

import { Button, Icon, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { BsChevronLeft } from "react-icons/bs";

export default function ModuleHRPayrollDetailMenuActionBack() {
  const router = useRouter();
  return (
    <Button
      size={'sm'}
      fontSize={'xs'}
      bg={useColorModeValue('white', 'gray.700')}
      onClick={() => router.push("/modules/hr/payrolls")}
      leftIcon={
        <Icon as={BsChevronLeft} boxSize={3} />
      }
    >
      Back
    </Button>
  )
}
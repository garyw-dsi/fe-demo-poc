"use client"

import { Button } from "@chakra-ui/react"
import { useRouter } from "next/navigation"

export default function ModuleUAMOrganizationMenuActionTransferMaintain() {
  const router = useRouter();

  return (
    <Button
      size={'sm'}
      fontSize={'xs'}
      colorScheme="red"
      onClick={() => router.push("/modules/uam/organization/edit/maintain")}
    >
      Transfer Maintain Organization
    </Button>
  )
}
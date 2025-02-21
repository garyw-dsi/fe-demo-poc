"use client"

import { Button, Icon } from "@chakra-ui/react"
import Link from "next/link"
import { RxOpenInNewWindow } from "react-icons/rx"

export default function ModuleCRMCustomerInformationHeader({
  pk
}: {
  pk: number | undefined
}) {
  return (
    <Button as={Link}
      href={`/modules/crm/customers/detail/${pk}`}
      fontSize={'xs'}
      size={'sm'}
      rightIcon={
        <Icon as={RxOpenInNewWindow} boxSize={3} />
      }
    >
      Customer Detail
    </Button>
  )
}
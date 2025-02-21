"use client"

import { Button, Icon } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { RxOpenInNewWindow } from "react-icons/rx"

export default function ModulePurchaseVendorInformationHeader({
  pk
}: {
  pk: number | undefined
}) {
  const router = useRouter();
  return (
    <Button
      fontSize={'xs'}
      size={'sm'}
      rightIcon={
        <Icon as={RxOpenInNewWindow} boxSize={3} />
      }
      onClick={() => router.push(`/modules/purchase/vendors/detail/${pk}`)}
    >
      Vendor Detail
    </Button>
  )
}
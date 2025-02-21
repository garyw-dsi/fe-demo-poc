"use client"

import { Button, Icon } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { FaPlus } from "react-icons/fa";

export default function ModuleAccountingVendorDetailAction({
  href, title
}: {
  href: string;
  title: string;
}) {
  const router = useRouter()

  return (
    <Button
      colorScheme="blue"
      fontSize={'xs'}
      size={'sm'}
      variant={'outline'}
      leftIcon={
        <Icon as={FaPlus} />
      }
      onClick={() => router.push(href)}
    >
      {title}
    </Button>
  )
}
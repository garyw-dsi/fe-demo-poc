"use client"

import { Button, Flex, Icon } from "@chakra-ui/react"
import { RxOpenInNewWindow } from "react-icons/rx"
import { useRouter } from "next/navigation";

export default function ModuleContactDetailAction({ contactId }: { contactId: number }) {
  const router = useRouter();
  return (
    <Flex align={'center'} gap={3}>
      <Button
        size={'sm'}
        fontSize={'xs'}
        rightIcon={
          <Icon as={RxOpenInNewWindow} />
        }
        onClick={() => router.push(`/modules/core/contacts/detail/${contactId}`)}
      >
        Contact Detail
      </Button>
    </Flex>
  )
}
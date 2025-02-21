"use client"

import { Button, Icon } from "@chakra-ui/react"
import { IoMdChatbubbles } from "react-icons/io"

export default function AIChatBot() {
  return (
    <Button
      size={'sm'}
      rounded={'full'}
      colorScheme="blue"
      w={12}
      h={12}
    >
      <Icon as={IoMdChatbubbles} boxSize={6} />
    </Button>
  )
}
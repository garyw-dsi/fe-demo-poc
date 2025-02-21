"use client"

import { Button, Icon } from "@chakra-ui/react";
import { BsChatFill } from "react-icons/bs";

export default function NavbarChats() {
  return (
    <Button size={'sm'} variant={'ghost'}>
      <Icon as={BsChatFill} boxSize={4} />
    </Button>
  )
}
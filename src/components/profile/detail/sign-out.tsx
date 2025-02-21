"use client"

import { Button, Icon } from "@chakra-ui/react"
import { signOut } from "next-auth/react"
import { CiLogout } from "react-icons/ci";

export default function ProfileSignOutButton() {
  const onLogout = async () => {
    await signOut({
      callbackUrl: '/auth/login',
    })
  }

  return (
    <Button
      fontSize={'xs'}
      size={'sm'}
      colorScheme="red"
      leftIcon={<Icon as={CiLogout} boxSize={5} />}
      onClick={onLogout}
    >
      Logout
    </Button>
  )
}
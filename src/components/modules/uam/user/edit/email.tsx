"use client"

import { Stack, Text, useColorModeValue } from "@chakra-ui/react";

export default function ModuleUAMUserEmail({
  email
}: Readonly<{
  email: string
}>) {
  return (
    <Stack spacing={1}>
      <Text
        fontSize={'xs'}
        color={useColorModeValue("gray.500", 'gray.400')}
      >
        Email
      </Text>
      <Text fontWeight={'semibold'}>
        {email}
      </Text>
    </Stack>
  )
}
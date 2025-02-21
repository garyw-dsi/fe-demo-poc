"use client"

import { LOGO_DARK, LOGO_LIGHT } from "@/constants/assets"
import { Container, Flex, Image, useColorMode } from "@chakra-ui/react"

export default function UserVerificationLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const { colorMode } = useColorMode();
  const LOGO = colorMode === 'light' ? LOGO_DARK : LOGO_LIGHT;

  return (
    <Container py={{ base: 5, md: 8 }}>
      {children}
      <Flex align={'center'} justify={'center'} gap={3} py={8}>
        <Image src={LOGO} w={24} alt="Symbolix" />
      </Flex>
    </Container>
  )
}
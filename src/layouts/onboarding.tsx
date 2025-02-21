"use client"

import { MODULE_BG } from "@/constants/assets";
import { Box, Container, Flex, Image, useColorModeValue } from "@chakra-ui/react";

export default function OnboardingLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex
      minH={'100dvh'}
      bg={useColorModeValue("white", "gray.800")}
    >
      <Box pos={'absolute'} zIndex={0} top={0}>
        <Image
          src={MODULE_BG}
          alt="Modules Background"
          w={'full'}
          objectFit="cover"
          transform={'scaleX(-1)'}
        />
      </Box>
      <Container zIndex={1} maxW={"6xl"} flex={1} display={'flex'}>
        {children}
      </Container>
    </Flex>
  )
}
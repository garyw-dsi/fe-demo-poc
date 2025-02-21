"use client"

import { LOGO_DARK, LOGO_LIGHT } from "@/constants/assets";
import { Flex, Image, useColorMode } from "@chakra-ui/react";

export default function AuthHeader() {
  const { colorMode } = useColorMode();
  const LOGO = colorMode === 'light' ? LOGO_DARK : LOGO_LIGHT;

  return (
    <Flex justify={'center'}>
      <Image src={LOGO} alt="Symbolix" w={32} />
    </Flex>
  )
}
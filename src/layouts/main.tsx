"use client"

import AIChatBot from "@/components/chat-bot";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";

interface MainModuleLayoutProps {
  navigationBar: React.ReactNode;
  children: React.ReactNode;
}

export default function MainLayout({
  navigationBar,
  children
}: Readonly<MainModuleLayoutProps>) {
  return (
    <Flex
      minH={'100dvh'}
      w={'full'}
      bg={useColorModeValue("gray.50", "gray.900")}
    >
      <Flex direction={'column'} w={'full'}>
        <Flex
          ps={{ md: 5 }}
          bg={useColorModeValue("white", "gray.800")}
          borderBottom={'1px'}
          borderBottomColor={useColorModeValue("gray.200", "gray.700")}
        >
          {navigationBar}
        </Flex>
        <Flex flex={1}>
          {children}
        </Flex>
      </Flex>

      <Box
        pos={'fixed'}
        zIndex={1}
        bottom={2}
        right={2}
      >
        <AIChatBot />
      </Box>
    </Flex>
  )
}
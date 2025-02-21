"use client"

import { Suspense } from "react";
import { Box, Flex, Image, Skeleton, useColorModeValue } from "@chakra-ui/react";
import { MODULE_BG } from "@/constants/assets";
import BottomNavigationBarHome from "@/components/bottom-bar/home";
import AIChatBot from "@/components/chat-bot";

const NavbarLoading = () => {
  return (
    <Flex justify={'space-between'} p={5} align={'center'}>
      <Skeleton w={40} h={5} />
      <Flex align={'center'} gap={5}>
        <Skeleton w={10} h={10} />
        <Skeleton w={10} h={10} />
      </Flex>
    </Flex>
  )
}

export default function ModulesHomeLayout({
  topHeader,
  navigationBar,
  children
}: Readonly<{
  topHeader?: React.ReactNode;
  navigationBar?: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <Flex
      w={'full'}
      minH={'100dvh'}
      direction={'column'}
      bg={useColorModeValue('gray.50', 'gray.900')}
    >
      <Box pos={'absolute'} zIndex={0} top={0}>
        <Image
          src={MODULE_BG}
          alt="Modules Background"
          w={'full'}
          objectFit="cover"
          opacity={0.6}
        />
      </Box>

      <Flex zIndex={1} direction={'column'} flex={1}>
        {topHeader}

        <Suspense fallback={<NavbarLoading />}>
          <Flex
            ps={{ md: 5 }}
            bg={useColorModeValue("white", "gray.800")}
            borderBottom={'1px'}
            borderBottomColor={useColorModeValue("gray.200", "gray.700")}
            pos={'sticky'}
            top={0}
            zIndex={1}
          >
            {navigationBar}
          </Flex>
        </Suspense>

        {children}
      </Flex>

      <BottomNavigationBarHome />

      <Box
        pos={'fixed'}
        zIndex={1}
        bottom={2}
        right={2}
        display={{ base: 'none', md: 'block' }}
      >
        <AIChatBot />
      </Box>
    </Flex>
  )
}
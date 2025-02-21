"use client"

import Sidebar from "@/components/sidebar";
import { ModuleName } from "@/constants/modules";
import { SubModule } from "@/constants/modules/links";
import { Flex, useColorModeValue } from "@chakra-ui/react";

interface MainModuleLayoutProps {
  module: ModuleName;
  navigationBar: React.ReactNode;
  submodules: SubModule[];
  children: React.ReactNode;
  bottomNavigationBar: React.ReactNode;
}

export default function MainModuleLayout({
  module,
  navigationBar,
  submodules,
  children,
  bottomNavigationBar
}: Readonly<MainModuleLayoutProps>) {
  return (
    <Flex
      minH={'100dvh'}
      w={'full'}
      direction={{ base: 'column', md: 'row' }}
      bg={useColorModeValue("gray.50", "gray.900")}
    >
      <Sidebar module={module} submodules={submodules} />
      <Flex direction={'column'} w={'full'} flex={1} mb={{ base: 20, md: 0 }}>
        <Flex
          ps={{ md: 5 }}
          bg={useColorModeValue("white", "gray.800")}
          borderBottom={'1px'}
          borderBottomColor={useColorModeValue("gray.200", "gray.700")}
          display={{ base: 'none', md: 'flex' }}
        >
          {navigationBar}
        </Flex>
        <Flex flex={1}>
          {children}
        </Flex>
      </Flex>
      {bottomNavigationBar}
    </Flex>
  )
}
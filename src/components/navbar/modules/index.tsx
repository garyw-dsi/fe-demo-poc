"use client"

import { Flex, Icon, IconButton, Text, useDisclosure } from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";

import ProfileMenu from "@/components/profile/menu";
import { moduleMap, ModuleName } from "@/constants/modules";
import SidebarHeader from "@/components/sidebar/header";
import { components } from "@/libs/api/schema/uam";
import { moduleLinks, SubModule } from "@/constants/modules/links";
import MainModuleMobileSidebar from "@/components/navbar/modules/mobile";

interface NavbarMainModulesProps {
  profile: components['schemas']['User'];
  module: ModuleName;
  submodules: SubModule[];
}

export default function NavbarMainModules({
  profile,
  module,
  submodules
}: NavbarMainModulesProps) {
  const {
    isOpen: isMobileSidebarOpen,
    onOpen: onOpenMobileSidebar,
    onClose: onCloseMobileSidebar
  } = useDisclosure();

  const moduleName = moduleMap[module];
  const links = moduleLinks[module];

  return (
    <Flex
      w={'full'}
      justify={'space-between'}
      p={5}
      align={'center'}
    >
      <MainModuleMobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={onCloseMobileSidebar}
        header={<ProfileMenu profile={profile} />}
        links={links}
        submodules={submodules}
      />

      <Flex display={{ base: 'flex', md: 'none' }}>
        <SidebarHeader isOpen={true} module={moduleName} />
      </Flex>

      <Text
        fontSize={{ base: 'sm', md: 'md' }}
        display={{ base: "none", md: 'block' }}
      >
        {profile?.group?.organization.legal_name || "Company Name"}
      </Text>

      <Flex align={'center'} gap={{ base: 1, md: 5 }}>
        <Flex display={{ base: 'none', md: 'flex' }}>
          <ProfileMenu profile={profile} />
        </Flex>

        <Flex display={{ base: 'flex', md: 'none' }}>
          <IconButton
            aria-label="Open Sidebar"
            icon={
              <Icon as={GiHamburgerMenu} boxSize={5} />
            }
            variant={'ghost'}
            size={'sm'}
            onClick={onOpenMobileSidebar}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}
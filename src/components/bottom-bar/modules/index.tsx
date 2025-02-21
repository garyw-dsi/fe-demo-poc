"use client";

import { Flex, Icon, Text, useColorModeValue, useDisclosure, } from "@chakra-ui/react";
import { HomeLinks } from "@/constants/modules/links/home";
import { moduleMap, ModuleName } from "@/constants/modules";
import { useRouter } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import MainModuleMobileSidebar from "@/components/navbar/modules/mobile";
import ProfileMenu from "@/components/profile/menu";
import { moduleLinks, SubModule } from "@/constants/modules/links";
import { components } from "@/libs/api/schema/uam";

interface NavigationLinkProps {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}

const NavigationLink = ({
  icon,
  label,
  onClick,
  isActive = false,
}: NavigationLinkProps) => {
  const activeColor = useColorModeValue("gray.800", "white");
  const inactiveColor = useColorModeValue("gray.300", "gray.600");

  return (
    <Flex
      direction={'column'}
      align={'center'}
      justify={'center'}
      gap={1}
      cursor="pointer"
      color={isActive ? activeColor : inactiveColor}
      onClick={onClick}
    >
      <Icon as={icon} boxSize={5} />
      <Text fontSize="xs">{label}</Text>
    </Flex>
  )
}

export default function BottomNavigationBarModules({
  profile,
  module,
  submodules,
}: {
  profile: components["schemas"]["User"];
  module: ModuleName;
  submodules: SubModule[];
}) {
  const router = useRouter();

  const currentModule = moduleMap[module];
  const links = moduleLinks[module];

  const {
    isOpen: isMobileSidebarOpen,
    onOpen: openMobileSidebar,
    onClose: closeMobileSidebar,
  } = useDisclosure();

  return (
    <Flex>
      <MainModuleMobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={closeMobileSidebar}
        header={<ProfileMenu profile={profile} />}
        links={links}
        submodules={submodules}
      />

      <Flex
        w={'full'}
        pos={"fixed"}
        bottom={0}
        zIndex={999}
        display={{ base: "flex", md: "none" }}
        bg={useColorModeValue("white", "gray.800")}
        borderTop={'1px'}
        borderTopColor={useColorModeValue("gray.200", "gray.700")}
        py={3} px={8}
        justify={"space-between"}
        align={'end'}
      >
        {[
          { ...HomeLinks[0], onClick: () => router.push(HomeLinks[0].route) },
          { ...HomeLinks[2], onClick: () => router.push(HomeLinks[2].route) },
          {
            icon: currentModule.icon,
            name: currentModule.name,
            isActive: true,
          },
          { ...HomeLinks[3], onClick: () => router.push(HomeLinks[3].route) },
          {
            icon: GiHamburgerMenu,
            name: "Menu",
            onClick: openMobileSidebar,
          },
        ].map(({ icon, name, onClick, isActive }, index) => (
          <NavigationLink
            key={index}
            icon={icon}
            label={name}
            onClick={onClick}
            isActive={isActive}
          />
        ))}
      </Flex>
    </Flex>
  )
}
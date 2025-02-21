"use client"

import { ModuleLinks, SubModule } from "@/constants/modules/links";
import { Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Icon, Stack, useColorModeValue } from "@chakra-ui/react";
import MainModuleMobileSidebarLinks from "./mobile-links";
import { FaChevronLeft } from "react-icons/fa";

interface MainModuleMobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  header: React.ReactNode;
  links: ModuleLinks[];
  submodules: SubModule[];
}

export default function MainModuleMobileSidebar({
  isOpen,
  onClose,
  header,
  links,
  submodules
}: MainModuleMobileSidebarProps) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="right"
      size={'sm'}
      closeOnEsc={true}
      closeOnOverlayClick={true}
    >
      <DrawerOverlay display={{ base: 'flex', md: 'none' }} />
      <DrawerContent
        display={{ base: 'flex', md: 'none' }}
        bg={useColorModeValue("white", "gray.900")}
      >
        <DrawerHeader>
          {header}
          <DrawerCloseButton />
        </DrawerHeader>
        <DrawerBody>
          <Stack
            divider={<Divider />}
            spacing={3}
          >
            {links.map((link, index) => (
              (
                submodules.includes(link.submodule as SubModule) ||
                link.submodule === null
              ) &&
              <MainModuleMobileSidebarLinks
                key={index}
                link={link}
                onClose={onClose}
              />
            ))}
          </Stack>
        </DrawerBody>
        <DrawerFooter>
          <Button
            w={'full'}
            size={'sm'}
            fontSize={'xs'}
            colorScheme="gray"
            leftIcon={
              <Icon as={FaChevronLeft} />
            }
            onClick={onClose}
          >
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
"use client"

import { Button, Icon, Menu, MenuButton, MenuItem, MenuItemProps, MenuList } from "@chakra-ui/react"
import { IoMdSettings } from "react-icons/io";

import MainModuleActionMenuItemExport from "./action-export";
import MainModuleActionMenuItemImport from "./action-import";

export {
  MainModuleActionMenuItemExport,
  MainModuleActionMenuItemImport
};

export const MainModuleActionMenuItem = ({
  children,
  ...props
}: MenuItemProps) => {
  return (
    <MenuItem fontSize={'xs'} {...props}>
      {children}
    </MenuItem>
  )
}

export const MainModuleActionMenu = ({
  listMenu
}: {
  listMenu: React.ReactNode;
}) => {
  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={Button}
        rightIcon={<Icon as={IoMdSettings} boxSize={3} />}
        size={'sm'}
        fontSize={'xs'}
        colorScheme="blue"
      >
        Actions
      </MenuButton>
      <MenuList py={1} boxShadow={'none'} zIndex={999}>
        {listMenu}
      </MenuList>
    </Menu>
  )
}
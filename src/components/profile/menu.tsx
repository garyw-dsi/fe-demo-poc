"use client"

import { components } from "@/libs/api/schema/uam";
import { Avatar, AvatarBadge, Flex, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Switch, Text, useColorMode } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function ProfileMenu({
  profile
}: {
  profile: components['schemas']['User']
}) {
  const name = `${profile?.first_name} ${profile?.last_name}`;

  const { colorMode, toggleColorMode } = useColorMode();

  const onLogout = async () => {
    await signOut({
      callbackUrl: '/auth/login',
    })
  }

  return (
    <Menu
      closeOnSelect={false}
      closeOnBlur={true}
    >
      <MenuButton>
        <Flex align={'center'} gap={3}>
          <Avatar
            name={name}
            size={"sm"}
            rounded={'md'}
            src={profile?.image.url || undefined}
          >
            <AvatarBadge boxSize="1em" bg="green.500" />
          </Avatar>
          <Text fontSize={'xs'}>
            {name}
          </Text>
        </Flex>
      </MenuButton>
      <MenuList zIndex={999} py={1} boxShadow={'none'}>
        <MenuItem fontSize={'xs'}>Documentation</MenuItem>
        <MenuItem fontSize={'xs'}>Support</MenuItem>
        <MenuItem>
          <Flex w={'full'} align={'center'} gap={5} justify={'space-between'}>
            <Text fontSize={'xs'}>Dark Mode</Text>
            <Switch
              isChecked={colorMode === 'dark'}
              onChange={toggleColorMode}
              colorScheme="blue"
            />
          </Flex>
        </MenuItem>
        <MenuDivider />
        <MenuItem as={Link}
          href={'/profile'}
          fontSize={'xs'}
        >
          My Profiles
        </MenuItem>
        <MenuItem
          fontSize={'xs'}
          color={'red'}
          onClick={onLogout}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
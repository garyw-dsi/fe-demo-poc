import { Flex, Text } from "@chakra-ui/react";

import ProfileMenu from "@/components/profile/menu";
import { getProfile } from "@/app/actions/profile";
import Link from "next/link";
import { components } from "@/libs/api/schema/uam";

/**
 * @description
 * Home navigation bar component.
 * will be displayed on the top of the page.
 * 
 * when on mobile, it will be hidden.
 * and the bottom navigation bar will be displayed.
 * 
 * @returns 
 */
export default async function HomeNavigationBar() {
  const profile = await getProfile();

  return (
    <Flex
      w={'full'}
      justify={'space-between'}
      p={5}
      align={'center'}
      display={{ base: 'none', md: 'flex' }}
    >
      <Text as={Link}
        href={"/modules"}
        fontSize={{ base: 'sm', md: 'md' }}
      >
        {profile?.group?.organization.legal_name || "Company Name"}
      </Text>

      <Flex align={'center'} gap={{ base: 2, md: 5 }}>
        <ProfileMenu profile={profile as components['schemas']['User']} />
      </Flex>
    </Flex>
  )
}
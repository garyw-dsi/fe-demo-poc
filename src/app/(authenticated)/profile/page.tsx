import { getDetailUserProfile } from "@/app/actions/profile";
import ProfileAvatar from "@/components/profile/detail/avatar";
import DetailProfileGroupInformation from "@/components/profile/detail/group-information";
import UserProfileMenuAction from "@/components/profile/detail/menu-action";
import DetailProfileOrganizationInformation from "@/components/profile/detail/organization-information";
import ProfileSignOutButton from "@/components/profile/detail/sign-out";
import UserProfileTabs from "@/components/profile/detail/tabs";
import DetailProfileUserInformation from "@/components/profile/detail/user-information";
import { Container, Flex, Stack } from "@chakra-ui/react";

export const dynamic = "force-dynamic";

export default async function UserProfilePage() {
  const { data, message, status } = await getDetailUserProfile();

  if (status === "error" || !data) {
    return <div>{message}</div>
  }

  return (
    <Container maxW={'6xl'} py={8}>
      <Stack spacing={5}>
        <UserProfileMenuAction />
        <Flex
          gap={8}
          direction={{ base: 'column', lg: 'row' }}
          align={{ base: 'center', lg: 'start' }}
        >
          <ProfileAvatar user={data.user} />

          <Stack w={'full'}>
            <Flex w={'full'}>
              <UserProfileTabs
                user={<DetailProfileUserInformation user={data.user} />}
                group={<DetailProfileGroupInformation group={data.group} />}
                organization={<DetailProfileOrganizationInformation organization={data.organization} />}
              />
            </Flex>

            <Flex justify={'end'} w={'full'}>
              <ProfileSignOutButton />
            </Flex>
          </Stack>
        </Flex>
      </Stack>
    </Container>
  )
}
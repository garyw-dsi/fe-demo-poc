import { Flex } from "@chakra-ui/react";
import { checkUserVerification } from "@/app/actions/user";
import ModulesHomeLayout from "@/layouts/modules-home";
import HomeNavigationBar from "@/components/navbar/home";
import HomeUserNotVerification from "@/components/not-verification";

export default async function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userVerification = await checkUserVerification();

  return (
    <ModulesHomeLayout
      navigationBar={<HomeNavigationBar />}
    >
      {userVerification
        ? children
        : (
          <Flex
            flex={1}
            align={'center'}
            justify={'center'}
            px={{ base: 5, md: 0 }}
          >
            <Flex w={{ base: 'full', md: 'lg' }}>
              <HomeUserNotVerification />
            </Flex>
          </Flex>
        )
      }
    </ModulesHomeLayout>
  )
}
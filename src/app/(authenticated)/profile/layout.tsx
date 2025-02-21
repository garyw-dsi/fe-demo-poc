import { checkUserVerification } from "@/app/actions/user";
import HomeNavigationBar from "@/components/navbar/home";
import UserNotVerificationAlert from "@/components/not-verification/alert";
import ModulesHomeLayout from "@/layouts/modules-home";

export default async function UserProfileLayout({
  children
}: {
  children: React.ReactNode
}) {
  const userVerification = await checkUserVerification();

  return (
    <ModulesHomeLayout
      topHeader={
        !userVerification && (
          <UserNotVerificationAlert />
        )
      }
      navigationBar={<HomeNavigationBar />}
    >
      {children}
    </ModulesHomeLayout>
  )
}
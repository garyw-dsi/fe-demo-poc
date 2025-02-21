import { checkIfNewUser } from "@/app/actions/modules";
import OnboardingLayout from "@/layouts/onboarding";
import { redirect } from "next/navigation";

export default async function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isNewUser = await checkIfNewUser();

  if (!isNewUser) {
    redirect("/modules");
  }

  return (
    <OnboardingLayout>
      {children}
    </OnboardingLayout>
  )
}
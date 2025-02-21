import { redirect } from "next/navigation";
import { checkIfNewUser } from "@/app/actions/modules";

export default async function ModulesLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isNewUser = await checkIfNewUser();

  if (isNewUser) {
    redirect("/onboarding");
  }

  return children;
}
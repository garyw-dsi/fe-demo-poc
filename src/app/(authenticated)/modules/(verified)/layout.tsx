import { redirect } from "next/navigation";
import { checkUserVerification } from "@/app/actions/user";

export default async function VerifiedModulesLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userVerification = await checkUserVerification();

  if (!userVerification) {
    redirect("/modules");
  }

  return children;
}
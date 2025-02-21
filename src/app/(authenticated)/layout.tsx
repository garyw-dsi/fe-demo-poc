import { authOptions } from "@/libs/next-auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function ProtectedLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authenticated = await getServerSession(authOptions);

  if (!authenticated) {
    redirect("/auth/login");
  }

  return children
}
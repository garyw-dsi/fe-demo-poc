import AuthLayout from "@/layouts/auth"
import { authOptions } from "@/libs/next-auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

export default async function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const authenticated = await getServerSession(authOptions);

  if (authenticated) {
    redirect("/modules")
  }

  return (
    <AuthLayout>
      {children}
    </AuthLayout>
  )
}
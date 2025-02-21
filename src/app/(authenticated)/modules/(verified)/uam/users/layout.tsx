import { redirect } from "next/navigation";
import { checkUserPermission } from "@/app/actions/modules";

const PERMISSION_ACTION = "read_user";

export default async function ReadUsersLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const permission = await checkUserPermission();

  if (!permission) {
    redirect("/modules");
  }

  const access = permission?.find((p) => p.action === PERMISSION_ACTION);

  if (!access) {
    redirect("/modules/uam");
  }

  return children;
}
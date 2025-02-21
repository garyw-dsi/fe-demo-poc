import { redirect } from "next/navigation";
import { checkUserAction } from "@/app/actions/modules";

const PERMISSION_ACTION = "read_group";

export default async function ReadGroupsLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const permission = await checkUserAction({ action: PERMISSION_ACTION });

  if (!permission) {
    redirect("/modules/uam");
  }

  return children;
}
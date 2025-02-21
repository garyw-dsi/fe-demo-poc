import { redirect } from "next/navigation";
import { checkUserAction } from "@/app/actions/modules";

const PERMISSION_ACTION = "read_organization";

export default async function ReadOrgLayout({
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
import { redirect } from "next/navigation";
import { checkUserAction } from "@/app/actions/modules";

const PERMISSION_ACTION = "read_contact";

export default async function ModuleContactReadLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const permission = await checkUserAction({ action: PERMISSION_ACTION });

  if (!permission) {
    redirect("/modules");
  }

  return children;
}
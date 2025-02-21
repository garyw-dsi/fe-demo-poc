import { redirect } from "next/navigation";
import { checkUserAction } from "@/app/actions/modules";

const PERMISSION_ACTION = "create_account";

export default async function ModuleAccountingAccountCreateLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const permission = await checkUserAction({ action: PERMISSION_ACTION });

  if (!permission) {
    redirect("/modules/accounting");
  }

  return children;
}
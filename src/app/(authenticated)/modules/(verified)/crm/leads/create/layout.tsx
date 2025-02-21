import { redirect } from "next/navigation";
import { checkUserAction } from "@/app/actions/modules";

const PERMISSION_ACTION = "create_lead";

export default async function ModuleCRMLeadCreateLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const permission = await checkUserAction({ action: PERMISSION_ACTION });

  if (!permission) {
    redirect("/modules/crm");
  }

  return children;
}
import { redirect } from "next/navigation";
import { checkUserPermission } from "@/app/actions/modules";
import { SubModule } from "@/constants/modules/links";

export const dynamic = "force-dynamic";

const PERMISSION_APP = "accounting";

export default async function AccountingApplications() {
  const permission = await checkUserPermission();

  // If no permission data or permission check fails, redirect to /modules
  if (!permission) {
    redirect("/modules");
  }

  // Check if the user has access to the "accounting" app
  const hasAccountingAccess = permission.some((p) => p.app === PERMISSION_APP);

  if (!hasAccountingAccess) {
    redirect("/modules");
  }

  // Determine which submodule the user has access to
  const submodules: SubModule[] = permission
    .filter((p) => p.app === PERMISSION_APP)
    .map((p) => p.submodule as SubModule);

  if (submodules.includes("account")) {
    redirect("/modules/accounting/accounts");
  }

  else {
    redirect("/modules");
  }
}
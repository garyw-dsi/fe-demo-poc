import { redirect } from "next/navigation";
import { checkUserPermission } from "@/app/actions/modules";
import { SubModule } from "@/constants/modules/links";

export const dynamic = "force-dynamic";

const PERMISSION_APP = "sales";

export default async function SalesApplications() {
  const permission = await checkUserPermission();

  // If no permission data or permission check fails, redirect to /modules
  if (!permission) {
    redirect("/modules");
  }

  // Check if the user has access to the "sales" app
  const hasSalesAccess = permission.some((p) => p.app === PERMISSION_APP);

  if (!hasSalesAccess) {
    redirect("/modules");
  }

  // Determine which submodule the user has access to
  const submodules: SubModule[] = permission
    .filter((p) => p.app === PERMISSION_APP)
    .map((p) => p.submodule as SubModule);

  if (submodules.includes("quotation")) {
    redirect("/modules/sales/quotations");
  }

  if (submodules.includes("order")) {
    redirect("/modules/sales/orders");
  }

  if (submodules.includes("invoice")) {
    redirect("/modules/sales/invoices");
  }

  else {
    redirect("/modules");
  }
}
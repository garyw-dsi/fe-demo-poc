import { redirect } from "next/navigation";
import { checkUserPermission } from "@/app/actions/modules";
import { SubModule } from "@/constants/modules/links";

export const dynamic = "force-dynamic";

const PERMISSION_APP = "crm";

export default async function CRMApplications() {
  const permission = await checkUserPermission();

  // If no permission data or permission check fails, redirect to /modules
  if (!permission) {
    redirect("/modules");
  }

  // Check if the user has access to the "crm" app
  const hasCRMAccess = permission.some((p) => p.app === PERMISSION_APP);

  if (!hasCRMAccess) {
    redirect("/modules");
  }

  // Determine which submodule the user has access to
  const submodules: SubModule[] = permission
    .filter((p) => p.app === PERMISSION_APP)
    .map((p) => p.submodule as SubModule);

  if (submodules.includes("customer")) {
    redirect("/modules/crm/customers");
  }

  if (submodules.includes("lead")) {
    redirect("/modules/crm/pipelines");
  }

  else {
    redirect("/modules");
  }
}
import { redirect } from "next/navigation";
import { checkUserPermission } from "@/app/actions/modules";
import { SubModule } from "@/constants/modules/links";

export const dynamic = "force-dynamic";

const PERMISSION_APP = "uam";

export default async function UAMApplications() {
  const permission = await checkUserPermission();

  // If no permission data or permission check fails, redirect to /modules
  if (!permission) {
    redirect("/modules");
  }

  // Check if the user has access to the "uam" app
  const hasUamAccess = permission.some((p) => p.app === PERMISSION_APP);

  if (!hasUamAccess) {
    redirect("/modules");
  }

  // Determine which submodule the user has access to
  const submodules: SubModule[] = permission
    .filter((p) => p.app === PERMISSION_APP)
    .map((p) => p.submodule as SubModule);

  if (submodules.includes("user")) {
    redirect("/modules/uam/users");
  }

  else if (submodules.includes("group")) {
    redirect("/modules/uam/groups");
  }

  else if (submodules.includes("organization")) {
    redirect("/modules/uam/organization");
  }

  else {
    redirect("/modules");
  }
}
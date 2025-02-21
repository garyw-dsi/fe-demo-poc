import { redirect } from "next/navigation";
import { checkUserPermission } from "@/app/actions/modules";

export const dynamic = "force-dynamic";

const PERMISSION_APP = "core_services";

export default async function ContactApplications() {
  const permission = await checkUserPermission();

  // If no permission data or permission check fails, redirect to /modules
  if (!permission) {
    redirect("/modules");
  }

  // Check if the user has access to the "core_services" app
  const hasCoreAccess = permission.some((p) => p.app === PERMISSION_APP);

  if (!hasCoreAccess) {
    redirect("/modules");
  }

  // Determine which submodule the user has access to
  const submodules = permission
    .filter((p) => p.app === PERMISSION_APP)
    .map((p) => p.submodule);

  if (submodules.includes("contact")) {
    redirect("/modules/core/contacts");
  }

  else {
    redirect("/modules");
  }
}
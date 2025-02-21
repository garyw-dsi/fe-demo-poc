import { redirect } from "next/navigation";
import { checkUserPermission } from "@/app/actions/modules";
import { SubModule } from "@/constants/modules/links";

export const dynamic = "force-dynamic";

const PERMISSION_APP = "inventory";

export default async function UAMApplications() {
  const permission = await checkUserPermission();

  // If no permission data or permission check fails, redirect to /modules
  if (!permission) {
    redirect("/modules");
  }

  // Check if the user has access to the "inventory" app
  const hasInventoryAccess = permission.some((p) => p.app === PERMISSION_APP);

  if (!hasInventoryAccess) {
    redirect("/modules");
  }

  // Determine which submodule the user has access to
  const submodules: SubModule[] = permission
    .filter((p) => p.app === PERMISSION_APP)
    .map((p) => p.submodule as SubModule);

  if (submodules.includes("product")) {
    redirect("/modules/inventory/products");
  }

  if (submodules.includes("product_category")) {
    redirect("/modules/inventory/products/category");
  }

  else {
    redirect("/modules");
  }

}
import { redirect } from "next/navigation";
// import { checkUserPermission } from "@/app/actions/modules";

export const dynamic = "force-dynamic";

// const PERMISSION_APP = "crm";

export default async function PurchaseApplications() {
  // const permission = await checkUserPermission();

  // // If no permission data or permission check fails, redirect to /modules
  // if (!permission) {
  //   redirect("/modules");
  // }

  // // Check if the user has access to the "crm" app
  // const hasCRMAccess = permission.some((p) => p.app === PERMISSION_APP);

  // if (!hasCRMAccess) {
  //   redirect("/modules");
  // }

  // // Determine which submodule the user has access to
  // const submodules = permission
  //   .filter((p) => p.app === PERMISSION_APP)
  //   .map((p) => p.submodule);

  // if (submodules.includes("customer")) {
  //   redirect("/modules/crm/customers");
  // }

  // if (submodules.includes("lead")) {
  //   redirect("/modules/crm/pipelines");
  // }

  // else {
  //   redirect("/modules");
  // }

  redirect("/modules/purchase/vendors")
}
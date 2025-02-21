import { redirect } from "next/navigation";
import MainModuleLayout from "@/layouts/modules-main"
// import { checkUserPermission } from "@/app/actions/modules";
import NavbarMainModules from "@/components/navbar/modules";
import { getProfile } from "@/app/actions/profile";
import { SubModule } from "@/constants/modules/links";
import BottomNavigationBarModules from "@/components/bottom-bar/modules";

/**
 * TODO: enable the permission check if the service is up
 * as for now we will just use the profile to check if the user is logged in
 * 
 */

// const PERMISSION_APP = "uam"

const dummySubmodules: SubModule[] = [
  "purchase-order", "vendor", "purchase-quotation",
  "purchase-requisition", "purchase-invoice"
];

export default async function ModulePurchaseLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  // const permission = await checkUserPermission();

  // if (!permission) {
  //   redirect("/modules");
  // }

  const profile = await getProfile();

  if (!profile) {
    redirect("/auth/login");
  }

  // const submodules: string[] = permission
  //   .filter((p) => p.app === PERMISSION_APP)
  //   .map((p) => p.submodule);

  return (
    <MainModuleLayout
      module="Purchase"
      submodules={dummySubmodules}
      navigationBar={
        <NavbarMainModules
          module="Purchase"
          submodules={dummySubmodules}
          profile={profile}
        />
      }
      bottomNavigationBar={
        <BottomNavigationBarModules
          module="Purchase"
          submodules={dummySubmodules}
          profile={profile}
        />
      }
    >
      {children}
    </MainModuleLayout>
  )
}
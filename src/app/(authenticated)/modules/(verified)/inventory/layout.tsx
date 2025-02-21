import { redirect } from "next/navigation";
import MainModuleLayout from "@/layouts/modules-main"
import { checkUserPermission } from "@/app/actions/modules";
import NavbarMainModules from "@/components/navbar/modules";
import { getProfile } from "@/app/actions/profile";
import { SubModule } from "@/constants/modules/links";
import BottomNavigationBarModules from "@/components/bottom-bar/modules";

/**
 * List of submodules that the user has access to
 * @constant PERMISSION_APP
 * @type {string[]}
 * @default
 * 
 * if user has access to inventory only it will render the inventory module
 * if user has access to core_services only it will render the core_services module 
 * etherwise it will render both modules
 */
const PERMISSION_APP = ["inventory"]

export default async function ModuleInventoryLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const permission = await checkUserPermission();

  if (!permission) {
    redirect("/modules");
  }

  const profile = await getProfile();

  if (!profile) {
    redirect("/auth/login");
  }

  const submodules: SubModule[] = permission
    .filter((p) => PERMISSION_APP.map((app) => p.app === app))
    .map((p) => p.submodule as SubModule);

  return (
    <MainModuleLayout
      module="Inventory"
      submodules={submodules}
      navigationBar={
        <NavbarMainModules
          module="Inventory"
          submodules={submodules}
          profile={profile}
        />
      }
      bottomNavigationBar={
        <BottomNavigationBarModules
          module="Inventory"
          submodules={submodules}
          profile={profile}
        />
      }
    >
      {children}
    </MainModuleLayout>
  )
}
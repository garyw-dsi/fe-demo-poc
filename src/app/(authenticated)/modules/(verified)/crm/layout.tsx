import { redirect } from "next/navigation";
import MainModuleLayout from "@/layouts/modules-main"
import { checkUserPermission } from "@/app/actions/modules";
import NavbarMainModules from "@/components/navbar/modules";
import { getProfile } from "@/app/actions/profile";
import { SubModule } from "@/constants/modules/links";
import BottomNavigationBarModules from "@/components/bottom-bar/modules";

const PERMISSION_APP = ["crm"] // List of submodules that the user has access to

export default async function ModuleCRMLayout({
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
      module="CRM"
      submodules={submodules}
      navigationBar={
        <NavbarMainModules
          module="CRM"
          submodules={submodules}
          profile={profile}
        />
      }
      bottomNavigationBar={
        <BottomNavigationBarModules
          module="CRM"
          submodules={submodules}
          profile={profile}
        />
      }
    >
      {children}
    </MainModuleLayout>
  )
}
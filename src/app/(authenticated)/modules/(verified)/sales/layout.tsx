import { redirect } from "next/navigation";
import MainModuleLayout from "@/layouts/modules-main"
import { checkUserPermission } from "@/app/actions/modules";
import NavbarMainModules from "@/components/navbar/modules";
import { getProfile } from "@/app/actions/profile";
import { SubModule } from "@/constants/modules/links";
import BottomNavigationBarModules from "@/components/bottom-bar/modules";

const PERMISSION_APP = "sales"

export default async function ModuleSalesLayout({
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
    .filter((p) => p.app === PERMISSION_APP)
    .map((p) => p.submodule as SubModule);

  return (
    <MainModuleLayout
      module="Sales"
      submodules={submodules}
      navigationBar={
        <NavbarMainModules
          module="Sales"
          submodules={submodules}
          profile={profile}
        />
      }
      bottomNavigationBar={
        <BottomNavigationBarModules
          module="Sales"
          submodules={submodules}
          profile={profile}
        />
      }
    >
      {children}
    </MainModuleLayout>
  )
}
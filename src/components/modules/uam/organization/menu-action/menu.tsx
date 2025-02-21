"use client"

import { MainModuleActionMenuItem, MainModuleActionMenuItemExport, MainModuleActionMenuItemImport } from "@/components/modules/main/menu-actions"
import { useRouter } from "next/navigation";
import { Fragment } from "react";

export const ModuleUAMOrganizationMenuBatch = () => {
  return (
    <Fragment>
      <MainModuleActionMenuItemImport>
        Import Data
      </MainModuleActionMenuItemImport>
      <MainModuleActionMenuItemExport>
        Export Data
      </MainModuleActionMenuItemExport>
    </Fragment>
  )
}

export const ModuleUAMOrganizationMenuEdit = () => {
  const router = useRouter();

  return (
    <MainModuleActionMenuItem
      onClick={() => router.push('/modules/uam/organization/edit')}
    >
      Edit Organization
    </MainModuleActionMenuItem>
  )
}
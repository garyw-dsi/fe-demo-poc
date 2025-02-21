"use client"

import { MainModuleActionMenuItem, MainModuleActionMenuItemExport, MainModuleActionMenuItemImport } from "@/components/modules/main/menu-actions"
import { useParams, useRouter } from "next/navigation"
import { Fragment } from "react";

export const ModuleHRSalaryStructureMenuCreate = () => {
  const router = useRouter();
  return (
    <MainModuleActionMenuItem
      onClick={() => router.push("/modules/hr/salary-structures/create")}
    >
      Create New Structure
    </MainModuleActionMenuItem>
  )
}

export const ModuleHRSalaryStructureMenuBatch = () => {
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

export const ModuleHRSalaryStructureMenuEdit = () => {
  const router = useRouter();
  const param = useParams();

  const pk = Number(param.pk);

  return (
    <MainModuleActionMenuItem
      onClick={() => router.push(`/modules/hr/salary-structures/edit/${pk}`)}
    >
      Edit Structure
    </MainModuleActionMenuItem>
  )
}
"use client"

import { MainModuleActionMenuItem, MainModuleActionMenuItemExport, MainModuleActionMenuItemImport } from "@/components/modules/main/menu-actions"
import { useParams, useRouter } from "next/navigation"
import { Fragment } from "react";

export const ModuleUAMGroupMenuCreate = () => {
  const router = useRouter();
  return (
    <MainModuleActionMenuItem
      onClick={() => router.push("/modules/uam/groups/create")}
    >
      Create New Group
    </MainModuleActionMenuItem>
  )
}

export const ModuleUAMGroupMenuBatch = () => {
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

export const ModuleUAMGroupMenuEdit = () => {
  const router = useRouter();
  const param = useParams();

  const pk = Number(param.pk);

  return (
    <MainModuleActionMenuItem
      onClick={() => router.push(`/modules/uam/groups/edit/${pk}`)}
    >
      Edit Group
    </MainModuleActionMenuItem>
  )
}
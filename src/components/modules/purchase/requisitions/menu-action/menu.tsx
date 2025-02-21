"use client"

import { MainModuleActionMenuItem, MainModuleActionMenuItemExport, MainModuleActionMenuItemImport } from "@/components/modules/main/menu-actions"
import { useParams, useRouter } from "next/navigation"
import { Fragment } from "react";

export const ModulePurchaseRequisitionsMenuCreate = () => {
  const router = useRouter();
  return (
    <MainModuleActionMenuItem
      onClick={() => router.push("/modules/purchase/requisitions/create")}
    >
      Create New Requisition
    </MainModuleActionMenuItem>
  )
}

export const ModulePurchaseRequisitionsMenuBatch = () => {
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

export const ModulePurchaseRequisitionsMenuEdit = () => {
  const router = useRouter();
  const param = useParams();

  const pk = Number(param.pk);

  return (
    <MainModuleActionMenuItem
      onClick={() => router.push(`/modules/purchase/requisitions/edit/${pk}`)}
    >
      Edit Requisition
    </MainModuleActionMenuItem>
  )
}
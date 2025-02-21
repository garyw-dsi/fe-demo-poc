"use client"

import { MainModuleActionMenuItem, MainModuleActionMenuItemExport, MainModuleActionMenuItemImport } from "@/components/modules/main/menu-actions"
import { useParams, useRouter } from "next/navigation"
import { Fragment } from "react";

export const ModulePurchaseQuotationsMenuCreate = () => {
  const router = useRouter();
  return (
    <MainModuleActionMenuItem
      onClick={() => router.push("/modules/purchase/quotations/create")}
    >
      Create New Quotation
    </MainModuleActionMenuItem>
  )
}

export const ModulePurchaseQuotationsMenuBatch = () => {
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

export const ModulePurchaseQuotationsMenuEdit = () => {
  const router = useRouter();
  const param = useParams();

  const pk = Number(param.pk);

  return (
    <MainModuleActionMenuItem
      onClick={() => router.push(`/modules/purchase/quotations/edit/${pk}`)}
    >
      Edit Quotation
    </MainModuleActionMenuItem>
  )
}
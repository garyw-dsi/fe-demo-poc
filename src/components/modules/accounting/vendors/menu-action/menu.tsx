"use client"

import {
  MainModuleActionMenuItem,
  MainModuleActionMenuItemExport,
  MainModuleActionMenuItemImport
} from "@/components/modules/main/menu-actions"
import { useParams, useRouter } from "next/navigation"
import { Fragment } from "react";

const routePrefix = "/modules/accounting/vendors";

export const ModuleAccountingVendorsMenuCreate = () => {
  const router = useRouter();
  return (
    <MainModuleActionMenuItem
      onClick={() => router.push(`${routePrefix}/create`)}
    >
      Create New Vendor Payment
    </MainModuleActionMenuItem>
  )
}

export const ModuleAccountingVendorsMenuBatch = () => {
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

export const ModuleAccountingVendorsMenuEdit = () => {
  const router = useRouter();
  const param = useParams();

  const pk = Number(param.pk);

  return (
    <MainModuleActionMenuItem
      onClick={() => router.push(`${routePrefix}/edit/${pk}`)}
    >
      Edit Vendor
    </MainModuleActionMenuItem>
  )
}
"use client"

import {
  MainModuleActionMenuItem,
  MainModuleActionMenuItemExport,
  MainModuleActionMenuItemImport
} from "@/components/modules/main/menu-actions"
import { useParams, useRouter } from "next/navigation"
import { Fragment } from "react";

const routePrefix = "/modules/accounting/banks";

export const ModuleAccountingBanksMenuCreate = () => {
  const router = useRouter();
  return (
    <MainModuleActionMenuItem
      onClick={() => router.push(`${routePrefix}/create`)}
    >
      Create New Bank
    </MainModuleActionMenuItem>
  )
}

export const ModuleAccountingBanksMenuBatch = () => {
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

export const ModuleAccountingBanksMenuEdit = () => {
  const router = useRouter();
  const param = useParams();

  const pk = Number(param.pk);

  return (
    <MainModuleActionMenuItem
      onClick={() => router.push(`${routePrefix}/edit/${pk}`)}
    >
      Edit Bank
    </MainModuleActionMenuItem>
  )
}
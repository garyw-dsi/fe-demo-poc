"use client"

import {
  MainModuleActionMenuItem,
  MainModuleActionMenuItemExport,
  MainModuleActionMenuItemImport
} from "@/components/modules/main/menu-actions"
import { useParams, useRouter } from "next/navigation"
import { Fragment } from "react";

const routePrefix = "/modules/accounting/accounts";

export const ModuleAccountingAccountsMenuCreate = () => {
  const router = useRouter();
  return (
    <MainModuleActionMenuItem
      onClick={() => router.push(`${routePrefix}/create`)}
    >
      Create New Account
    </MainModuleActionMenuItem>
  )
}

export const ModuleAccountingAccountsMenuBatch = () => {
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

export const ModuleAccountingAccountsMenuEdit = () => {
  const router = useRouter();
  const param = useParams();

  const pk = Number(param.pk);

  return (
    <MainModuleActionMenuItem
      onClick={() => router.push(`${routePrefix}/edit/${pk}`)}
    >
      Edit Account
    </MainModuleActionMenuItem>
  )
}
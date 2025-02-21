"use client"

import {
  MainModuleActionMenuItem,
  MainModuleActionMenuItemExport,
  MainModuleActionMenuItemImport
} from "@/components/modules/main/menu-actions"
import { useParams, useRouter } from "next/navigation"
import { Fragment } from "react";

const routePrefix = "/modules/accounting/customers";

export const ModuleAccountingCustomersMenuCreate = () => {
  const router = useRouter();
  return (
    <MainModuleActionMenuItem
      onClick={() => router.push(`${routePrefix}/create`)}
    >
      Create New Customer Payment
    </MainModuleActionMenuItem>
  )
}

export const ModuleAccountingCustomersMenuBatch = () => {
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

export const ModuleAccountingCustomersMenuEdit = () => {
  const router = useRouter();
  const param = useParams();

  const pk = Number(param.pk);

  return (
    <MainModuleActionMenuItem
      onClick={() => router.push(`${routePrefix}/edit/${pk}`)}
    >
      Edit Customer
    </MainModuleActionMenuItem>
  )
}
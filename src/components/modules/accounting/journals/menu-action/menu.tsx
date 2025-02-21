"use client"

import {
  MainModuleActionMenuItem,
  MainModuleActionMenuItemExport,
  MainModuleActionMenuItemImport
} from "@/components/modules/main/menu-actions"
import { useParams, useRouter } from "next/navigation"
import { Fragment } from "react";

const routePrefix = "/modules/accounting/journals";

export const ModuleAccountingJournalsMenuCreate = () => {
  const router = useRouter();
  return (
    <MainModuleActionMenuItem
      onClick={() => router.push(`${routePrefix}/create`)}
    >
      Create New Journal
    </MainModuleActionMenuItem>
  )
}

export const ModuleAccountingJournalsMenuBatch = () => {
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

export const ModuleAccountingJournalsMenuEdit = () => {
  const router = useRouter();
  const param = useParams();

  const pk = Number(param.pk);

  return (
    <MainModuleActionMenuItem
      onClick={() => router.push(`${routePrefix}/edit/${pk}`)}
    >
      Edit Journal
    </MainModuleActionMenuItem>
  )
}
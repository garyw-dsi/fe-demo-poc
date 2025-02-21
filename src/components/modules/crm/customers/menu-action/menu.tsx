"use client"

import {
  MainModuleActionMenuItem,
  MainModuleActionMenuItemExport,
  MainModuleActionMenuItemImport
} from "@/components/modules/main/menu-actions"
import { useParams, useRouter } from "next/navigation"
import { Fragment } from "react";

export const ModuleCRMCustomersMenuCreate = () => {
  const router = useRouter();
  return (
    <MainModuleActionMenuItem
      onClick={() => router.push("/modules/crm/customers/create")}
    >
      Create New Customer
    </MainModuleActionMenuItem>
  )
}

export const ModuleCRMCustomersMenuBatch = () => {
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

export const ModuleCRMCustomersMenuEdit = () => {
  const router = useRouter();
  const param = useParams();

  const pk = Number(param.pk);

  return (
    <MainModuleActionMenuItem
      onClick={() => router.push(`/modules/crm/customers/edit/${pk}`)}
    >
      Edit Customer
    </MainModuleActionMenuItem>
  )
}
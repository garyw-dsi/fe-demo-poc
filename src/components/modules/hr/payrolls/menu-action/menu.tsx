"use client"

import { MainModuleActionMenuItem, MainModuleActionMenuItemExport, MainModuleActionMenuItemImport } from "@/components/modules/main/menu-actions"
import { useParams, useRouter } from "next/navigation"
import { Fragment } from "react";

export const ModuleHRPayrollMenuCreate = () => {
  const router = useRouter();
  return (
    <MainModuleActionMenuItem
      onClick={() => router.push("/modules/hr/payrolls/create")}
    >
      Create New Payroll
    </MainModuleActionMenuItem>
  )
}

export const ModuleHRPayrollMenuBatch = () => {
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

export const ModuleHRPayrollMenuEdit = () => {
  const router = useRouter();
  const param = useParams();

  const pk = Number(param.pk);

  return (
    <MainModuleActionMenuItem
      onClick={() => router.push(`/modules/hr/payrolls/edit/${pk}`)}
    >
      Edit Payroll
    </MainModuleActionMenuItem>
  )
}
"use client"

import { MainModuleActionMenuItem } from "@/components/modules/main/menu-actions"
import { useRouter } from "next/navigation"

export const ModuleCRMPipelineMenuCreate = () => {
  const router = useRouter();
  return (
    <MainModuleActionMenuItem
      onClick={() => router.push("/modules/crm/leads/create")}
    >
      Create New Lead
    </MainModuleActionMenuItem>
  )
}
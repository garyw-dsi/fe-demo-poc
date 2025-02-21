"use client"

import { MainModuleActionMenuItem, MainModuleActionMenuItemExport, MainModuleActionMenuItemImport } from "@/components/modules/main/menu-actions"
import { useDisclosure } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation"
import { Fragment } from "react";
import ModalCreateTag from "../create/modal";

export const ModuleTagsMenuCreate = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Fragment>
      <ModalCreateTag
        isOpen={isOpen}
        onClose={onClose}
      />
      <MainModuleActionMenuItem
        onClick={onOpen}
      >
        Create New Tag
      </MainModuleActionMenuItem>
    </Fragment>
  )
}

export const ModuleTagsMenuBatch = () => {
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

export const ModuleTagsMenuEdit = () => {
  const router = useRouter();
  const param = useParams();

  const pk = Number(param.pk);

  return (
    <MainModuleActionMenuItem
      onClick={() => router.push(`/modules/inventory/products/edit/${pk}`)}
    >
      Edit Tag
    </MainModuleActionMenuItem>
  )
}
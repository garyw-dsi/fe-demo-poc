"use client"

import { Fragment } from "react";
import { useParams } from "next/navigation";
import { useDisclosure } from "@chakra-ui/react";
import { MainModuleActionMenuItem } from "@/components/modules/main/menu-actions";
import ModuleInventoryProductDelete from "@/components/modules/inventory/products/delete";

export default function ModuleInventoryProductMenuActionDelete() {
  const param = useParams();

  const pk = Number(param.pk);

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Fragment>
      <ModuleInventoryProductDelete
        isOpen={isOpen}
        onClose={onClose}
        pk={pk}
      />
      <MainModuleActionMenuItem
        onClick={onOpen}
      >
        Delete Product
      </MainModuleActionMenuItem>
    </Fragment>
  )
}
"use client"

import { Fragment } from "react";
import { useParams } from "next/navigation";
import { useDisclosure } from "@chakra-ui/react";
import { MainModuleActionMenuItem } from "@/components/modules/main/menu-actions";
import ModuleInventoryProductCategoryDelete from "../delete";

export default function ModuleInventoryProductCategoryMenuActionDelete() {
  const param = useParams();

  const pk = Number(param.pk);

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Fragment>
      <ModuleInventoryProductCategoryDelete
        isOpen={isOpen}
        onClose={onClose}
        pk={pk}
      />
      <MainModuleActionMenuItem
        onClick={onOpen}
      >
        Delete Category
      </MainModuleActionMenuItem>
    </Fragment>
  )
}
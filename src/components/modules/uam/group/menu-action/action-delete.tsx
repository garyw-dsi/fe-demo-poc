"use client"

import { MainModuleActionMenuItem } from "@/components/modules/main/menu-actions";
import { useDisclosure } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { Fragment } from "react";
import ModuleUAMGroupDelete from "@/components/modules/uam/group/delete";

export default function ModuleUAMGroupDetailMenuActionDelete() {
  const param = useParams();

  const pk = Number(param.pk);

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Fragment>
      <ModuleUAMGroupDelete
        isOpen={isOpen}
        onClose={onClose}
        pk={pk}
      />
      <MainModuleActionMenuItem
        onClick={onOpen}
      >
        Delete Group
      </MainModuleActionMenuItem>
    </Fragment>
  )
}
"use client"

import { MainModuleActionMenuItem } from "@/components/modules/main/menu-actions";
import { useDisclosure } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { Fragment } from "react";
import ModuleUAMUserDelete from "../delete";

export default function ModuleUAMUserDetailMenuActionDelete() {
  const param = useParams();

  const pk = Number(param.pk);

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Fragment>
      <ModuleUAMUserDelete
        isOpen={isOpen}
        onClose={onClose}
        pk={pk}
      />
      <MainModuleActionMenuItem
        onClick={onOpen}
      >
        Delete User
      </MainModuleActionMenuItem>
    </Fragment>
  )
}
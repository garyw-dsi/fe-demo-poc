"use client"

import { MainModuleActionMenuItem } from "@/components/modules/main/menu-actions";
import { useDisclosure } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { Fragment } from "react";
import ModuleContactDelete from "@/components/modules/core/contacts/delete";

export default function ModuleContactsDetailMenuActionDelete() {
  const param = useParams();

  const pk = Number(param.pk);

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Fragment>
      <ModuleContactDelete
        isOpen={isOpen}
        onClose={onClose}
        pk={pk}
      />

      <MainModuleActionMenuItem
        onClick={onOpen}
      >
        Delete Contact
      </MainModuleActionMenuItem>
    </Fragment>
  )
}
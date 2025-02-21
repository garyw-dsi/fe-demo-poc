"use client"

import { MainModuleActionMenuItem } from "@/components/modules/main/menu-actions";
import { useDisclosure } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { Fragment } from "react";
import ModuleCRMLeadDelete from "../delete";

export default function ModuleCRMLeadDetailMenuActionDelete() {
  const params = useParams();
  const pk = Number(params.pk);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Fragment>
      <ModuleCRMLeadDelete
        isOpen={isOpen}
        onClose={onClose}
        pk={pk}
      />
      <MainModuleActionMenuItem
        onClick={onOpen}
      >
        Delete Lead
      </MainModuleActionMenuItem>
    </Fragment>
  )
}
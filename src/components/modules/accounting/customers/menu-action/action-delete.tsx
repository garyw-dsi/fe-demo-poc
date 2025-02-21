"use client"

import { MainModuleActionMenuItem } from "@/components/modules/main/menu-actions";
import { useDisclosure } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { Fragment } from "react";
import ModuleAccountingCustomerDelete from "../delete";

export default function ModuleAccountingCustomersDetailMenuActionDelete() {
  const params = useParams();
  const pk = Number(params.pk);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Fragment>
      <ModuleAccountingCustomerDelete
        isOpen={isOpen}
        onClose={onClose}
        pk={pk}
      />

      <MainModuleActionMenuItem
        onClick={onOpen}
      >
        Delete Customer
      </MainModuleActionMenuItem>
    </Fragment>
  )
}
"use client"

import { MainModuleActionMenuItem } from "@/components/modules/main/menu-actions";
import { useDisclosure } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { Fragment } from "react";
import ModuleCRMCustomerDelete from "../delete";

export default function ModuleCRMCustomersDetailMenuActionDelete({
  cid
}: {
  cid: number
}) {
  const param = useParams();

  const pk = Number(param.pk);

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Fragment>
      <ModuleCRMCustomerDelete
        isOpen={isOpen}
        onClose={onClose}
        pk={pk}
        cid={cid}
      />
      <MainModuleActionMenuItem
        onClick={onOpen}
      >
        Delete Customer
      </MainModuleActionMenuItem>
    </Fragment>
  )
}
"use client"

import { MainModuleActionMenuItem } from "@/components/modules/main/menu-actions";
import { Fragment } from "react";
import ModulePurchaseVendorDelete from "../delete";
import { useDisclosure } from "@chakra-ui/react";
import { useParams } from "next/navigation";

export default function ModulePurchaseVendorsDetailMenuActionDelete({
  cid
}: {
  cid: number
}) {
  const params = useParams();
  const pk = Number(params.pk);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Fragment>
      <ModulePurchaseVendorDelete
        cid={cid}
        isOpen={isOpen}
        onClose={onClose}
        pk={pk}
      />

      <MainModuleActionMenuItem onClick={onOpen}>
        Delete Vendor
      </MainModuleActionMenuItem>
    </Fragment>
  )
}
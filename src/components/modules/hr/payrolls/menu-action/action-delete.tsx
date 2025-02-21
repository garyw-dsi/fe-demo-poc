"use client"

import { MainModuleActionMenuItem } from "@/components/modules/main/menu-actions";
import { useDisclosure } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { Fragment } from "react";
import ModuleHRPayrollDelete from "../delete";

export default function ModuleHRPayrollDetailMenuActionDelete() {
  const param = useParams();

  const pk = Number(param.pk);

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Fragment>
      <ModuleHRPayrollDelete
        isOpen={isOpen}
        onClose={onClose}
        pk={pk}
      />
      <MainModuleActionMenuItem
        onClick={onOpen}
      >
        Delete Payroll
      </MainModuleActionMenuItem>
    </Fragment>
  )
}
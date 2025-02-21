import { Fragment, } from "react";
import { Flex, MenuDivider, } from "@chakra-ui/react";

import { checkUserAction } from "@/app/actions/modules";
import { MainModuleActionMenu } from "@/components/modules/main/menu-actions";

import ModuleSalesInvoiceMenuActionBack from "@/components/modules/sales/invoices/menu-action/action-back";
import ModuleSalesInvoiceDetailMenuActionDelete from "@/components/modules/sales/invoices/menu-action/action-delete";
import {
  ModuleSalesInvoicesMenuBatch,
  ModuleSalesInvoicesMenuCreate,
  ModuleSalesInvoicesMenuEdit
} from "@/components/modules/sales/invoices/menu-action/menu";

export default async function ModuleSalesInvoicesMenuAction() {
  const actionCreate = await checkUserAction({ action: "create_invoice" });

  if (!actionCreate) {
    return null
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            <ModuleSalesInvoicesMenuCreate />
            <MenuDivider />
            <ModuleSalesInvoicesMenuBatch />
          </Fragment>
        }
      />
    </Flex>
  )
}

export const ModuleSalesInvoicesDetailMenuAction = async ({
  editable = true
}: {
  editable?: boolean;
}) => {
  const [
    actionCreate, actionUpdate, actionDelete
  ] = await Promise.all([
    checkUserAction({ action: "create_invoice" }),
    checkUserAction({ action: "update_invoice" }),
    checkUserAction({ action: "delete_invoice" }),
  ]);

  if (
    !actionCreate &&
    !actionUpdate &&
    !actionDelete
  ) {
    return <ModuleSalesInvoiceMenuActionBack />
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <ModuleSalesInvoiceMenuActionBack />
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            {actionCreate && <ModuleSalesInvoicesMenuCreate />}
            {(actionUpdate && editable) && <ModuleSalesInvoicesMenuEdit />}
            {actionDelete && <ModuleSalesInvoiceDetailMenuActionDelete />}
            {actionCreate && (
              <Fragment>
                <MenuDivider />
                <ModuleSalesInvoicesMenuBatch />
              </Fragment>
            )}
          </Fragment>
        }
      />
    </Flex>
  )
}
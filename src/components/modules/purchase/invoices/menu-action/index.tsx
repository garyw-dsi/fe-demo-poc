import { Fragment, } from "react";
import { Flex, MenuDivider, } from "@chakra-ui/react";

// import { checkUserAction } from "@/app/actions/modules";
import { MainModuleActionMenu } from "@/components/modules/main/menu-actions";

import ModulePurchaseInvoiceMenuActionBack from "@/components/modules/purchase/invoices/menu-action/action-back";
import ModulePurchaseInvoiceDetailMenuActionDelete from "@/components/modules/purchase/invoices/menu-action/action-delete";
import {
  ModulePurchaseInvoicesMenuBatch,
  ModulePurchaseInvoicesMenuCreate,
  ModulePurchaseInvoicesMenuEdit
} from "@/components/modules/purchase/invoices/menu-action/menu";

export default async function ModulePurchaseInvoicesMenuAction() {
  // const actionCreate = await checkUserAction({ action: "create_lead" });
  const actionCreate = true;
  if (!actionCreate) {
    return null
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            <ModulePurchaseInvoicesMenuCreate />
            <MenuDivider />
            <ModulePurchaseInvoicesMenuBatch />
          </Fragment>
        }
      />
    </Flex>
  )
}

export const ModulePurchaseInvoicesDetailMenuAction = async () => {
  // const [
  //   actionCreate, actionUpdate, actionDelete
  // ] = await Promise.all([
  //   checkUserAction({ action: "create_lead" }),
  //   checkUserAction({ action: "update_lead" }),
  //   checkUserAction({ action: "delete_lead" }),
  // ]);

  const actionCreate = true;
  const actionUpdate = true;
  const actionDelete = true;

  if (
    !actionCreate &&
    !actionUpdate &&
    !actionDelete
  ) {
    return <ModulePurchaseInvoiceMenuActionBack />
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <ModulePurchaseInvoiceMenuActionBack />
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            {actionCreate && <ModulePurchaseInvoicesMenuCreate />}
            {actionUpdate && <ModulePurchaseInvoicesMenuEdit />}
            {actionDelete && <ModulePurchaseInvoiceDetailMenuActionDelete />}
            {actionCreate && (
              <Fragment>
                <MenuDivider />
                <ModulePurchaseInvoicesMenuBatch />
              </Fragment>
            )}
          </Fragment>
        }
      />
    </Flex>
  )
}
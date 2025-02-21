import { Fragment, } from "react";
import { Flex, MenuDivider, } from "@chakra-ui/react";

// import { checkUserAction } from "@/app/actions/modules";
import { MainModuleActionMenu } from "@/components/modules/main/menu-actions";

import ModulePurchaseOrderMenuActionBack from "@/components/modules/purchase/orders/menu-action/action-back";
import ModulePurchaseOrderDetailMenuActionDelete from "@/components/modules/purchase/orders/menu-action/action-delete";
import {
  ModulePurchaseOrdersMenuBatch,
  ModulePurchaseOrdersMenuCreate,
  ModulePurchaseOrdersMenuEdit
} from "@/components/modules/purchase/orders/menu-action/menu";

export default async function ModulePurchaseOrdersMenuAction() {
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
            <ModulePurchaseOrdersMenuCreate />
            <MenuDivider />
            <ModulePurchaseOrdersMenuBatch />
          </Fragment>
        }
      />
    </Flex>
  )
}

export const ModulePurchaseOrdersDetailMenuAction = async () => {
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
    return <ModulePurchaseOrderMenuActionBack />
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <ModulePurchaseOrderMenuActionBack />
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            {actionCreate && <ModulePurchaseOrdersMenuCreate />}
            {actionUpdate && <ModulePurchaseOrdersMenuEdit />}
            {actionDelete && <ModulePurchaseOrderDetailMenuActionDelete />}
            {actionCreate && (
              <Fragment>
                <MenuDivider />
                <ModulePurchaseOrdersMenuBatch />
              </Fragment>
            )}
          </Fragment>
        }
      />
    </Flex>
  )
}
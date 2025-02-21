import { Fragment, } from "react";
import { Flex, MenuDivider, } from "@chakra-ui/react";

import { checkUserAction } from "@/app/actions/modules";
import { MainModuleActionMenu } from "@/components/modules/main/menu-actions";
import ModuleInventoryProductMenuActionBack from "@/components/modules/inventory/products/menu-action/action-back";
import ModuleInventoryProductMenuActionDelete from "@/components/modules/inventory/products/menu-action/action-delete";
import {
  ModuleInventoryProductMenuBatch,
  ModuleInventoryProductMenuCreate,
  ModuleInventoryProductMenuEdit
} from "@/components/modules/inventory/products/menu-action/menu";

export default async function ModuleInventoryProductMenuAction() {
  const actionCreate = await checkUserAction({ action: "create_product" });

  if (!actionCreate) {
    return null
  }

  return (
    <MainModuleActionMenu
      listMenu={
        <Fragment>
          <ModuleInventoryProductMenuCreate />
          <MenuDivider />
          <ModuleInventoryProductMenuBatch />
        </Fragment>
      }
    />
  )
}

export const ModuleInventoryProductDetailMenuAction = async () => {
  const [
    actionCreate, actionUpdate, actionDelete
  ] = await Promise.all([
    checkUserAction({ action: "create_product" }),
    checkUserAction({ action: "update_product" }),
    checkUserAction({ action: "delete_product" }),
  ]);

  if (
    !actionCreate &&
    !actionUpdate &&
    !actionDelete
  ) {
    return <ModuleInventoryProductMenuActionBack />
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <ModuleInventoryProductMenuActionBack />
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            {actionCreate && <ModuleInventoryProductMenuCreate />}
            {actionUpdate && <ModuleInventoryProductMenuEdit />}
            {actionDelete && <ModuleInventoryProductMenuActionDelete />}
            {actionCreate && (
              <Fragment>
                <MenuDivider />
                <ModuleInventoryProductMenuBatch />
              </Fragment>
            )}
          </Fragment>
        }
      />
    </Flex>
  )
}
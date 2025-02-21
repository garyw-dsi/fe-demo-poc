import { Fragment, } from "react";
import { Flex, MenuDivider, } from "@chakra-ui/react";

import { checkUserAction } from "@/app/actions/modules";
import { MainModuleActionMenu } from "@/components/modules/main/menu-actions";
import ModuleInventoryProductCategoryMenuActionBack from "@/components/modules/inventory/products-category/menu-action/action-back";
import ModuleInventoryProductCategoryMenuActionDelete from "@/components/modules/inventory/products-category/menu-action/action-delete";
import {
  ModuleInventoryProductCategoryMenuBatch,
  ModuleInventoryProductCategoryMenuCreate,
  ModuleInventoryProductCategoryMenuEdit
} from "@/components/modules/inventory/products-category/menu-action/menu";

export default async function ModuleInventoryProductCategoryMenuAction() {
  const actionCreate = await checkUserAction({ action: "create_product_category" });

  if (!actionCreate) {
    return null
  }

  return (
    <MainModuleActionMenu
      listMenu={
        <Fragment>
          <ModuleInventoryProductCategoryMenuCreate />
          <MenuDivider />
          <ModuleInventoryProductCategoryMenuBatch />
        </Fragment>
      }
    />
  )
}

export const ModuleInventoryProductCategoryDetailMenuAction = async () => {
  const [
    actionCreate, actionUpdate, actionDelete
  ] = await Promise.all([
    checkUserAction({ action: "create_product_category" }),
    checkUserAction({ action: "update_product_category" }),
    checkUserAction({ action: "delete_product_category" }),
  ]);

  if (
    !actionCreate &&
    !actionUpdate &&
    !actionDelete
  ) {
    return <ModuleInventoryProductCategoryMenuActionBack />
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <ModuleInventoryProductCategoryMenuActionBack />
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            {actionCreate && <ModuleInventoryProductCategoryMenuCreate />}
            {actionUpdate && <ModuleInventoryProductCategoryMenuEdit />}
            {actionDelete && <ModuleInventoryProductCategoryMenuActionDelete />}
            {actionCreate && (
              <Fragment>
                <MenuDivider />
                <ModuleInventoryProductCategoryMenuBatch />
              </Fragment>
            )}
          </Fragment>
        }
      />
    </Flex>
  )
}
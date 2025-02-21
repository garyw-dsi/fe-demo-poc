import { Fragment, } from "react";
import { Flex, MenuDivider, } from "@chakra-ui/react";

import { checkUserAction } from "@/app/actions/modules";
import { MainModuleActionMenu } from "@/components/modules/main/menu-actions";

import ModuleSalesOrderMenuActionBack from "@/components/modules/sales/orders/menu-action/action-back";
import ModuleSalesOrderDetailMenuActionDelete from "@/components/modules/sales/orders/menu-action/action-delete";
import {
  ModuleSalesOrdersMenuBatch,
  ModuleSalesOrdersMenuCreate,
  ModuleSalesOrdersMenuEdit
} from "@/components/modules/sales/orders/menu-action/menu";

export default async function ModuleSalesOrdersMenuAction() {
  const actionCreate = await checkUserAction({ action: "create_order" });
  if (!actionCreate) {
    return null
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            <ModuleSalesOrdersMenuCreate />
            <MenuDivider />
            <ModuleSalesOrdersMenuBatch />
          </Fragment>
        }
      />
    </Flex>
  )
}

export const ModuleSalesOrdersDetailMenuAction = async ({
  editable = true
}: {
  editable?: boolean;
}) => {
  const [
    actionCreate, actionUpdate, actionDelete
  ] = await Promise.all([
    checkUserAction({ action: "create_order" }),
    checkUserAction({ action: "update_order" }),
    checkUserAction({ action: "delete_order" }),
  ]);

  if (
    !actionCreate &&
    !actionUpdate &&
    !actionDelete
  ) {
    return <ModuleSalesOrderMenuActionBack />
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <ModuleSalesOrderMenuActionBack />
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            {actionCreate && <ModuleSalesOrdersMenuCreate />}
            {(actionUpdate && editable) && <ModuleSalesOrdersMenuEdit />}
            {actionDelete && <ModuleSalesOrderDetailMenuActionDelete />}
            {actionCreate && (
              <Fragment>
                <MenuDivider />
                <ModuleSalesOrdersMenuBatch />
              </Fragment>
            )}
          </Fragment>
        }
      />
    </Flex>
  )
}
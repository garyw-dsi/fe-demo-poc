import { Fragment, } from "react";
import { Flex, MenuDivider, } from "@chakra-ui/react";

import { checkUserAction } from "@/app/actions/modules";
import { MainModuleActionMenu } from "@/components/modules/main/menu-actions";
import ModuleAccountingCustomersMenuActionBack from "@/components/modules/accounting/customers/menu-action/action-back";
import ModuleAccountingCustomersDetailMenuActionDelete from "@/components/modules/accounting/customers/menu-action/action-delete";
import {
  ModuleAccountingCustomersMenuBatch,
  ModuleAccountingCustomersMenuCreate,
  ModuleAccountingCustomersMenuEdit
} from "@/components/modules/accounting/customers/menu-action/menu";

export default async function ModuleAccountingCustomersMenuAction() {
  const actionCreate = await checkUserAction({ action: "create_account" });

  if (!actionCreate) {
    return null
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            <ModuleAccountingCustomersMenuCreate />
            <MenuDivider />
            <ModuleAccountingCustomersMenuBatch />
          </Fragment>
        }
      />
    </Flex>
  )
}

export const ModuleAccountingCustomersDetailMenuAction = async () => {
  const [
    actionCreate, actionUpdate, actionDelete
  ] = await Promise.all([
    checkUserAction({ action: "create_account" }),
    checkUserAction({ action: "update_account" }),
    checkUserAction({ action: "delete_account" }),
  ]);

  if (
    !actionCreate &&
    !actionUpdate &&
    !actionDelete
  ) {
    return <ModuleAccountingCustomersMenuActionBack />
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <ModuleAccountingCustomersMenuActionBack />
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            {actionCreate && <ModuleAccountingCustomersMenuCreate />}
            {actionUpdate && <ModuleAccountingCustomersMenuEdit />}
            {actionDelete && <ModuleAccountingCustomersDetailMenuActionDelete />}
            {actionCreate && (
              <Fragment>
                <MenuDivider />
                <ModuleAccountingCustomersMenuBatch />
              </Fragment>
            )}
          </Fragment>
        }
      />
    </Flex>
  )
}
import { Fragment, } from "react";
import { Flex, MenuDivider, } from "@chakra-ui/react";

import { checkUserAction } from "@/app/actions/modules";
import { MainModuleActionMenu } from "@/components/modules/main/menu-actions";
import ModuleAccountingAccountsMenuActionBack from "@/components/modules/accounting/accounts/menu-action/action-back";
import ModuleAccountingAccountsDetailMenuActionDelete from "@/components/modules/accounting/accounts/menu-action/action-delete";
import {
  ModuleAccountingAccountsMenuBatch,
  ModuleAccountingAccountsMenuCreate,
  ModuleAccountingAccountsMenuEdit
} from "@/components/modules/accounting/accounts/menu-action/menu";

export default async function ModuleAccountingAccountsMenuAction() {
  const actionCreate = await checkUserAction({ action: "create_account" });

  if (!actionCreate) {
    return null
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            <ModuleAccountingAccountsMenuCreate />
            <MenuDivider />
            <ModuleAccountingAccountsMenuBatch />
          </Fragment>
        }
      />
    </Flex>
  )
}

export const ModuleAccountingAccountsDetailMenuAction = async () => {
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
    return <ModuleAccountingAccountsMenuActionBack />
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <ModuleAccountingAccountsMenuActionBack />
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            {actionCreate && <ModuleAccountingAccountsMenuCreate />}
            {actionUpdate && <ModuleAccountingAccountsMenuEdit />}
            {actionDelete && <ModuleAccountingAccountsDetailMenuActionDelete />}
            {actionCreate && (
              <Fragment>
                <MenuDivider />
                <ModuleAccountingAccountsMenuBatch />
              </Fragment>
            )}
          </Fragment>
        }
      />
    </Flex>
  )
}
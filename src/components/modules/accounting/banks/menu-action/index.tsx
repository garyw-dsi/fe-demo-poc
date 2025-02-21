import { Fragment, } from "react";
import { Flex, MenuDivider, } from "@chakra-ui/react";

import { checkUserAction } from "@/app/actions/modules";
import { MainModuleActionMenu } from "@/components/modules/main/menu-actions";
import ModuleAccountingBanksMenuActionBack from "@/components/modules/accounting/banks/menu-action/action-back";
import ModuleAccountingBanksDetailMenuActionDelete from "@/components/modules/accounting/banks/menu-action/action-delete";
import {
  ModuleAccountingBanksMenuBatch,
  ModuleAccountingBanksMenuCreate,
  ModuleAccountingBanksMenuEdit
} from "@/components/modules/accounting/banks/menu-action/menu";

export default async function ModuleAccountingBanksMenuAction() {
  const actionCreate = await checkUserAction({ action: "create_account" });

  if (!actionCreate) {
    return null
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            <ModuleAccountingBanksMenuCreate />
            <MenuDivider />
            <ModuleAccountingBanksMenuBatch />
          </Fragment>
        }
      />
    </Flex>
  )
}

export const ModuleAccountingBanksDetailMenuAction = async () => {
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
    return <ModuleAccountingBanksMenuActionBack />
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <ModuleAccountingBanksMenuActionBack />
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            {actionCreate && <ModuleAccountingBanksMenuCreate />}
            {actionUpdate && <ModuleAccountingBanksMenuEdit />}
            {actionDelete && <ModuleAccountingBanksDetailMenuActionDelete />}
            {actionCreate && (
              <Fragment>
                <MenuDivider />
                <ModuleAccountingBanksMenuBatch />
              </Fragment>
            )}
          </Fragment>
        }
      />
    </Flex>
  )
}
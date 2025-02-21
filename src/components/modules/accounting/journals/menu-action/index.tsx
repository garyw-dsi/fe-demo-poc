import { Fragment, } from "react";
import { Flex, MenuDivider, } from "@chakra-ui/react";

import { checkUserAction } from "@/app/actions/modules";
import { MainModuleActionMenu } from "@/components/modules/main/menu-actions";
import ModuleAccountingJournalsMenuActionBack from "@/components/modules/accounting/journals/menu-action/action-back";
import ModuleAccountingJournalsDetailMenuActionDelete from "@/components/modules/accounting/journals/menu-action/action-delete";
import {
  ModuleAccountingJournalsMenuBatch,
  ModuleAccountingJournalsMenuCreate,
  ModuleAccountingJournalsMenuEdit
} from "@/components/modules/accounting/journals/menu-action/menu";

export default async function ModuleAccountingJournalMenuAction() {
  const actionCreate = await checkUserAction({ action: "create_account" });

  if (!actionCreate) {
    return null
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            <ModuleAccountingJournalsMenuCreate />
            <MenuDivider />
            <ModuleAccountingJournalsMenuBatch />
          </Fragment>
        }
      />
    </Flex>
  )
}

export const ModuleAccountingJournalsDetailMenuAction = async () => {
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
    return <ModuleAccountingJournalsMenuActionBack />
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <ModuleAccountingJournalsMenuActionBack />
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            {actionCreate && <ModuleAccountingJournalsMenuCreate />}
            {actionUpdate && <ModuleAccountingJournalsMenuEdit />}
            {actionDelete && <ModuleAccountingJournalsDetailMenuActionDelete />}
            {actionCreate && (
              <Fragment>
                <MenuDivider />
                <ModuleAccountingJournalsMenuBatch />
              </Fragment>
            )}
          </Fragment>
        }
      />
    </Flex>
  )
}
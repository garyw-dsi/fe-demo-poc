import { Fragment, } from "react";
import { Flex, MenuDivider, } from "@chakra-ui/react";

import { checkUserAction } from "@/app/actions/modules";
import { MainModuleActionMenu } from "@/components/modules/main/menu-actions";
import ModuleAccountingVendorsMenuActionBack from "@/components/modules/accounting/vendors/menu-action/action-back";
import ModuleAccountingVendorsDetailMenuActionDelete from "@/components/modules/accounting/vendors/menu-action/action-delete";
import {
  ModuleAccountingVendorsMenuBatch,
  ModuleAccountingVendorsMenuCreate,
  ModuleAccountingVendorsMenuEdit
} from "@/components/modules/accounting/vendors/menu-action/menu";

export default async function ModuleAccountingVendorsMenuAction() {
  const actionCreate = await checkUserAction({ action: "create_account" });

  if (!actionCreate) {
    return null
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            <ModuleAccountingVendorsMenuCreate />
            <MenuDivider />
            <ModuleAccountingVendorsMenuBatch />
          </Fragment>
        }
      />
    </Flex>
  )
}

export const ModuleAccountingVendorsDetailMenuAction = async () => {
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
    return <ModuleAccountingVendorsMenuActionBack />
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <ModuleAccountingVendorsMenuActionBack />
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            {actionCreate && <ModuleAccountingVendorsMenuCreate />}
            {actionUpdate && <ModuleAccountingVendorsMenuEdit />}
            {actionDelete && <ModuleAccountingVendorsDetailMenuActionDelete />}
            {actionCreate && (
              <Fragment>
                <MenuDivider />
                <ModuleAccountingVendorsMenuBatch />
              </Fragment>
            )}
          </Fragment>
        }
      />
    </Flex>
  )
}
import { Fragment, } from "react";
import { Flex, MenuDivider, } from "@chakra-ui/react";

import { checkUserAction } from "@/app/actions/modules";
import { MainModuleActionMenu } from "@/components/modules/main/menu-actions";
import ModuleUAMUserDetailMenuActionBack from "@/components/modules/uam/user/menu-action/action-back";
import ModuleUAMUserDetailMenuActionDelete from "@/components/modules/uam/user/menu-action/action-delete";
import {
  ModuleUAMUserMenuBatch,
  ModuleUAMUserMenuCreate,
  ModuleUAMUserMenuEdit
} from "@/components/modules/uam/user/menu-action/menu";

export default async function ModuleUAMMenuAction() {
  const actionCreate = await checkUserAction({ action: "create_user" });

  if (!actionCreate) {
    return null
  }

  return (
    <MainModuleActionMenu
      listMenu={
        <Fragment>
          <ModuleUAMUserMenuCreate />
          <MenuDivider />
          <ModuleUAMUserMenuBatch />
        </Fragment>
      }
    />
  )
}

export const ModuleUAMUserDetailMenuAction = async () => {
  const [
    actionCreate, actionUpdate, actionDelete
  ] = await Promise.all([
    checkUserAction({ action: "create_user" }),
    checkUserAction({ action: "update_user" }),
    checkUserAction({ action: "delete_user" }),
  ]);

  if (
    !actionCreate &&
    !actionUpdate &&
    !actionDelete
  ) {
    return <ModuleUAMUserDetailMenuActionBack />
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <ModuleUAMUserDetailMenuActionBack />
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            {actionCreate && <ModuleUAMUserMenuCreate />}
            {actionUpdate && <ModuleUAMUserMenuEdit />}
            {actionDelete && <ModuleUAMUserDetailMenuActionDelete />}
            {actionCreate && (
              <Fragment>
                <MenuDivider />
                <ModuleUAMUserMenuBatch />
              </Fragment>
            )}
          </Fragment>
        }
      />
    </Flex>
  )
}
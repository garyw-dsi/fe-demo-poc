import { Fragment, } from "react";
import { Flex, MenuDivider, } from "@chakra-ui/react";

import { checkUserAction } from "@/app/actions/modules";
import { MainModuleActionMenu } from "@/components/modules/main/menu-actions";
import ModuleUAMGroupDetailMenuActionBack from "@/components/modules/uam/group/menu-action/action-back";
import ModuleUAMGroupDetailMenuActionDelete from "@/components/modules/uam/group/menu-action/action-delete";
import {
  ModuleUAMGroupMenuBatch,
  ModuleUAMGroupMenuCreate,
  ModuleUAMGroupMenuEdit
} from "@/components/modules/uam/group/menu-action/menu";

export default async function ModuleUAMGroupMenuAction() {
  const actionCreate = await checkUserAction({ action: "create_group" });

  if (!actionCreate) {
    return null
  }

  return (
    <MainModuleActionMenu
      listMenu={
        <Fragment>
          <ModuleUAMGroupMenuCreate />
          <MenuDivider />
          <ModuleUAMGroupMenuBatch />
        </Fragment>
      }
    />
  )
}

export const ModuleUAMGroupDetailMenuAction = async () => {
  const [
    actionCreate, actionUpdate, actionDelete
  ] = await Promise.all([
    checkUserAction({ action: "create_group" }),
    checkUserAction({ action: "update_group" }),
    checkUserAction({ action: "delete_group" }),
  ]);

  if (
    !actionCreate &&
    !actionUpdate &&
    !actionDelete
  ) {
    return <ModuleUAMGroupDetailMenuActionBack />
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <ModuleUAMGroupDetailMenuActionBack />
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            {actionCreate && <ModuleUAMGroupMenuCreate />}
            {actionUpdate && <ModuleUAMGroupMenuEdit />}
            {actionDelete && <ModuleUAMGroupDetailMenuActionDelete />}
            {actionCreate && (
              <Fragment>
                <MenuDivider />
                <ModuleUAMGroupMenuBatch />
              </Fragment>
            )}
          </Fragment>
        }
      />
    </Flex>
  )
}
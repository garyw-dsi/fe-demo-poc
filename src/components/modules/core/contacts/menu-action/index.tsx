import { Fragment, } from "react";
import { Flex, MenuDivider, } from "@chakra-ui/react";

import { checkUserAction } from "@/app/actions/modules";
import { MainModuleActionMenu } from "@/components/modules/main/menu-actions";
import ModuleContactsMenuActionBack from "@/components/modules/core/contacts/menu-action/action-back";
import ModuleContactsDetailMenuActionDelete from "@/components/modules/core/contacts/menu-action/action-delete";
import {
  ModuleContactsMenuBatch,
  ModuleContactsMenuCreate,
  ModuleContactsMenuEdit
} from "@/components/modules/core/contacts/menu-action/menu";

export default async function ModuleContactsMenuAction() {
  const actionCreate = await checkUserAction({ action: "create_contact" });

  if (!actionCreate) {
    return null
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            <ModuleContactsMenuCreate />
            <MenuDivider />
            <ModuleContactsMenuBatch />
          </Fragment>
        }
      />
    </Flex>
  )
}

export const ModuleContactsDetailMenuAction = async () => {
  const [
    actionCreate, actionUpdate, actionDelete
  ] = await Promise.all([
    checkUserAction({ action: "create_contact" }),
    checkUserAction({ action: "update_contact" }),
    checkUserAction({ action: "delete_contact" }),
  ]);

  if (
    !actionCreate &&
    !actionUpdate &&
    !actionDelete
  ) {
    return <ModuleContactsMenuActionBack />
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <ModuleContactsMenuActionBack />
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            {actionCreate && <ModuleContactsMenuCreate />}
            {actionUpdate && <ModuleContactsMenuEdit />}
            {actionDelete && <ModuleContactsDetailMenuActionDelete />}
            {actionCreate && (
              <Fragment>
                <MenuDivider />
                <ModuleContactsMenuBatch />
              </Fragment>
            )}
          </Fragment>
        }
      />
    </Flex>
  )
}
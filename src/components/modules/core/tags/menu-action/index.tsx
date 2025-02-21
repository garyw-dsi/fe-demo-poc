import { Fragment, } from "react";
import { Flex, MenuDivider, } from "@chakra-ui/react";

import { checkUserAction } from "@/app/actions/modules";
import { MainModuleActionMenu } from "@/components/modules/main/menu-actions";
import ModuleTagMenuActionBack from "./action-back";
import { ModuleTagsMenuBatch, ModuleTagsMenuCreate, ModuleTagsMenuEdit } from "./menu";
import ModuleTagsMenuActionDelete from "./action-delete";

export default async function ModuleTagMenuAction() {
  return (
    <MainModuleActionMenu
      listMenu={
        <Fragment>
          <ModuleTagsMenuCreate />
          <MenuDivider />
          <ModuleTagsMenuBatch />
        </Fragment>
      }
    />
  )
}

export const ModuleTagDetailMenuAction = async () => {
  const [
    actionUpdate, actionDelete
  ] = await Promise.all([
    checkUserAction({ action: "update_tag" }),
    checkUserAction({ action: "delete_tag" }),
  ]);

  if (
    !actionUpdate &&
    !actionDelete
  ) {
    return <ModuleTagMenuActionBack />
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <ModuleTagMenuActionBack />
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            <ModuleTagsMenuCreate />
            {actionUpdate && <ModuleTagsMenuEdit />}
            {actionDelete && <ModuleTagsMenuActionDelete />}
            <Fragment>
              <MenuDivider />
              <ModuleTagsMenuBatch />
            </Fragment>
          </Fragment>
        }
      />
    </Flex>
  )
}
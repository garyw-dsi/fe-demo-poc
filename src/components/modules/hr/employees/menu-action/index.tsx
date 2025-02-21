import { Fragment, } from "react";
import { Flex, MenuDivider, } from "@chakra-ui/react";

import { MainModuleActionMenu } from "@/components/modules/main/menu-actions";
import ModuleHREmployeeDetailMenuActionBack from "@/components/modules/hr/employees/menu-action/action-back";
import ModuleHREmployeeDetailMenuActionDelete from "@/components/modules/hr/employees/menu-action/action-delete";
import {
  ModuleHREmployeeMenuBatch,
  ModuleHREmployeeMenuCreate,
  ModuleHREmployeeMenuEdit
} from "@/components/modules/hr/employees/menu-action/menu";

export default async function ModuleHREmployeeMenuAction() {
  // const actionCreate = await checkUserAction({ action: "create_user" });

  // if (!actionCreate) {
  //   return null
  // }

  return (
    <MainModuleActionMenu
      listMenu={
        <Fragment>
          <ModuleHREmployeeMenuCreate />
          <MenuDivider />
          <ModuleHREmployeeMenuBatch />
        </Fragment>
      }
    />
  )
}

export const ModuleHREmployeeDetailMenuAction = async () => {
  // const [
  //   actionCreate, actionUpdate, actionDelete
  // ] = await Promise.all([
  //   checkUserAction({ action: "create_user" }),
  //   checkUserAction({ action: "update_user" }),
  //   checkUserAction({ action: "delete_user" }),
  // ]);

  // if (
  //   !actionCreate &&
  //   !actionUpdate &&
  //   !actionDelete
  // ) {
  //   return <ModuleHREmployeeDetailMenuActionBack />
  // }

  const { actionCreate, actionUpdate, actionDelete } = {
    actionCreate: true,
    actionUpdate: true,
    actionDelete: true,
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <ModuleHREmployeeDetailMenuActionBack />
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            {actionCreate && <ModuleHREmployeeMenuCreate />}
            {actionUpdate && <ModuleHREmployeeMenuEdit />}
            {actionDelete && <ModuleHREmployeeDetailMenuActionDelete />}
            {actionCreate && (
              <Fragment>
                <MenuDivider />
                <ModuleHREmployeeMenuBatch />
              </Fragment>
            )}
          </Fragment>
        }
      />
    </Flex>
  )
}
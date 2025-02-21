import { Fragment, } from "react";
import { Flex, MenuDivider, } from "@chakra-ui/react";

import { MainModuleActionMenu } from "@/components/modules/main/menu-actions";
import ModuleHRDepartmentDetailMenuActionBack from "@/components/modules/hr/departments/menu-action/action-back";
import ModuleHRDepartmentDetailMenuActionDelete from "@/components/modules/hr/departments/menu-action/action-delete";
import {
  ModuleHRDepartmentMenuBatch,
  ModuleHRDepartmentMenuCreate,
  ModuleHRDepartmentMenuEdit
} from "@/components/modules/hr/departments/menu-action/menu";

export default async function ModuleHRDepartmentMenuAction() {
  // const actionCreate = await checkUserAction({ action: "create_user" });

  // if (!actionCreate) {
  //   return null
  // }

  return (
    <MainModuleActionMenu
      listMenu={
        <Fragment>
          <ModuleHRDepartmentMenuCreate />
          <MenuDivider />
          <ModuleHRDepartmentMenuBatch />
        </Fragment>
      }
    />
  )
}

export const ModuleHRDepartmentDetailMenuAction = async () => {
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
  //   return <ModuleHRDepartmentDetailMenuActionBack />
  // }

  const { actionCreate, actionUpdate, actionDelete } = {
    actionCreate: true,
    actionUpdate: true,
    actionDelete: true,
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <ModuleHRDepartmentDetailMenuActionBack />
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            {actionCreate && <ModuleHRDepartmentMenuCreate />}
            {actionUpdate && <ModuleHRDepartmentMenuEdit />}
            {actionDelete && <ModuleHRDepartmentDetailMenuActionDelete />}
            {actionCreate && (
              <Fragment>
                <MenuDivider />
                <ModuleHRDepartmentMenuBatch />
              </Fragment>
            )}
          </Fragment>
        }
      />
    </Flex>
  )
}
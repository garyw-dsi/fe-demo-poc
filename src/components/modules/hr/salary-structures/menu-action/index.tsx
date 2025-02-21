import { Fragment, } from "react";
import { Flex, MenuDivider, } from "@chakra-ui/react";

import { MainModuleActionMenu } from "@/components/modules/main/menu-actions";
import ModuleHRSalaryStructureDetailMenuActionBack from "@/components/modules/hr/salary-structures/menu-action/action-back";
import ModuleHRSalaryStructureDetailMenuActionDelete from "@/components/modules/hr/salary-structures/menu-action/action-delete";
import {
  ModuleHRSalaryStructureMenuBatch,
  ModuleHRSalaryStructureMenuCreate,
  ModuleHRSalaryStructureMenuEdit
} from "@/components/modules/hr/salary-structures/menu-action/menu";

export default async function ModuleHRSalaryStructureMenuAction() {
  // const actionCreate = await checkUserAction({ action: "create_user" });

  // if (!actionCreate) {
  //   return null
  // }

  return (
    <MainModuleActionMenu
      listMenu={
        <Fragment>
          <ModuleHRSalaryStructureMenuCreate />
          <MenuDivider />
          <ModuleHRSalaryStructureMenuBatch />
        </Fragment>
      }
    />
  )
}

export const ModuleHRSalaryStructureDetailMenuAction = async () => {
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
  //   return <ModuleHRSalaryStructureDetailMenuActionBack />
  // }

  const { actionCreate, actionUpdate, actionDelete } = {
    actionCreate: true,
    actionUpdate: true,
    actionDelete: true,
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <ModuleHRSalaryStructureDetailMenuActionBack />
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            {actionCreate && <ModuleHRSalaryStructureMenuCreate />}
            {actionUpdate && <ModuleHRSalaryStructureMenuEdit />}
            {actionDelete && <ModuleHRSalaryStructureDetailMenuActionDelete />}
            {actionCreate && (
              <Fragment>
                <MenuDivider />
                <ModuleHRSalaryStructureMenuBatch />
              </Fragment>
            )}
          </Fragment>
        }
      />
    </Flex>
  )
}
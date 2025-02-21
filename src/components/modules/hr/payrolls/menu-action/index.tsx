import { Fragment, } from "react";
import { Flex, MenuDivider, } from "@chakra-ui/react";

import { MainModuleActionMenu } from "@/components/modules/main/menu-actions";
import ModuleHRPayrollDetailMenuActionBack from "@/components/modules/hr/payrolls/menu-action/action-back";
import ModuleHRPayrollDetailMenuActionDelete from "@/components/modules/hr/payrolls/menu-action/action-delete";
import {
  ModuleHRPayrollMenuBatch,
  ModuleHRPayrollMenuCreate,
  ModuleHRPayrollMenuEdit
} from "@/components/modules/hr/payrolls/menu-action/menu";

export default async function ModuleHRPayrollMenuAction() {
  // const actionCreate = await checkUserAction({ action: "create_user" });

  // if (!actionCreate) {
  //   return null
  // }

  return (
    <MainModuleActionMenu
      listMenu={
        <Fragment>
          <ModuleHRPayrollMenuCreate />
          <MenuDivider />
          <ModuleHRPayrollMenuBatch />
        </Fragment>
      }
    />
  )
}

export const ModuleHRPayrollDetailMenuAction = async () => {
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
  //   return <ModuleHRPayrollDetailMenuActionBack />
  // }

  const { actionCreate, actionUpdate, actionDelete } = {
    actionCreate: true,
    actionUpdate: true,
    actionDelete: true,
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <ModuleHRPayrollDetailMenuActionBack />
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            {actionCreate && <ModuleHRPayrollMenuCreate />}
            {actionUpdate && <ModuleHRPayrollMenuEdit />}
            {actionDelete && <ModuleHRPayrollDetailMenuActionDelete />}
            {actionCreate && (
              <Fragment>
                <MenuDivider />
                <ModuleHRPayrollMenuBatch />
              </Fragment>
            )}
          </Fragment>
        }
      />
    </Flex>
  )
}
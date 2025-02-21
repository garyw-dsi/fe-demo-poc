import { Fragment, } from "react";
import { Flex, MenuDivider, } from "@chakra-ui/react";

// import { checkUserAction } from "@/app/actions/modules";
import { MainModuleActionMenu } from "@/components/modules/main/menu-actions";

import ModulePurchaseRequisitionMenuActionBack from "@/components/modules/purchase/requisitions/menu-action/action-back";
import ModulePurchaseRequisitionDetailMenuActionDelete from "@/components/modules/purchase/requisitions/menu-action/action-delete";
import {
  ModulePurchaseRequisitionsMenuBatch,
  ModulePurchaseRequisitionsMenuCreate,
  ModulePurchaseRequisitionsMenuEdit
} from "@/components/modules/purchase/requisitions/menu-action/menu";

export default async function ModulePurchaseRequisitionsMenuAction() {
  // const actionCreate = await checkUserAction({ action: "create_lead" });
  const actionCreate = true;
  if (!actionCreate) {
    return null
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            <ModulePurchaseRequisitionsMenuCreate />
            <MenuDivider />
            <ModulePurchaseRequisitionsMenuBatch />
          </Fragment>
        }
      />
    </Flex>
  )
}

export const ModulePurchaseRequisitionsDetailMenuAction = async () => {
  // const [
  //   actionCreate, actionUpdate, actionDelete
  // ] = await Promise.all([
  //   checkUserAction({ action: "create_lead" }),
  //   checkUserAction({ action: "update_lead" }),
  //   checkUserAction({ action: "delete_lead" }),
  // ]);

  const actionCreate = true;
  const actionUpdate = true;
  const actionDelete = true;

  if (
    !actionCreate &&
    !actionUpdate &&
    !actionDelete
  ) {
    return <ModulePurchaseRequisitionMenuActionBack />
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <ModulePurchaseRequisitionMenuActionBack />
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            {actionCreate && <ModulePurchaseRequisitionsMenuCreate />}
            {actionUpdate && <ModulePurchaseRequisitionsMenuEdit />}
            {actionDelete && <ModulePurchaseRequisitionDetailMenuActionDelete />}
            {actionCreate && (
              <Fragment>
                <MenuDivider />
                <ModulePurchaseRequisitionsMenuBatch />
              </Fragment>
            )}
          </Fragment>
        }
      />
    </Flex>
  )
}
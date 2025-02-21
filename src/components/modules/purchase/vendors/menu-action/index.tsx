import { Fragment, } from "react";
import { Flex, MenuDivider, } from "@chakra-ui/react";

// import { checkUserAction } from "@/app/actions/modules";
import { MainModuleActionMenu } from "@/components/modules/main/menu-actions";
import ModulePurchaseVendorsMenuActionBack from "@/components/modules/purchase/vendors/menu-action/action-back";
import ModulePurchaseVendorsDetailMenuActionDelete from "@/components/modules/purchase/vendors/menu-action/action-delete";
import {
  ModulePurchaseVendorsMenuBatch,
  ModulePurchaseVendorsMenuCreate,
  ModulePurchaseVendorsMenuEdit
} from "@/components/modules/purchase/vendors/menu-action/menu";

export default async function ModulePurchaseVendorsMenuAction() {
  // const actionCreate = await checkUserAction({ action: "create_customer" });
  const actionCreate = true;

  if (!actionCreate) {
    return null
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            <ModulePurchaseVendorsMenuCreate />
            <MenuDivider />
            <ModulePurchaseVendorsMenuBatch />
          </Fragment>
        }
      />
    </Flex>
  )
}

/**
 * 
 * @async
 * @param cid
 * @description 
 * cid is contact id, it use for reference to delete vendor data
 * and contact in core_sercice
 * 
 */
export const ModulePurchaseVendorsDetailMenuAction = async ({
  cid
}: {
  cid: number;
}) => {
  // const [
  //   actionCreate, actionUpdate, actionDelete
  // ] = await Promise.all([
  //   checkUserAction({ action: "create_customer" }),
  //   checkUserAction({ action: "update_customer" }),
  //   checkUserAction({ action: "delete_customer" }),
  // ]);

  const actionCreate = true;
  const actionUpdate = true;
  const actionDelete = true;

  if (
    !actionCreate &&
    !actionUpdate &&
    !actionDelete
  ) {
    return <ModulePurchaseVendorsMenuActionBack />
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <ModulePurchaseVendorsMenuActionBack />
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            {actionCreate && <ModulePurchaseVendorsMenuCreate />}
            {actionUpdate && <ModulePurchaseVendorsMenuEdit />}
            {actionDelete && <ModulePurchaseVendorsDetailMenuActionDelete cid={cid} />}
            {actionCreate && (
              <Fragment>
                <MenuDivider />
                <ModulePurchaseVendorsMenuBatch />
              </Fragment>
            )}
          </Fragment>
        }
      />
    </Flex>
  )
}
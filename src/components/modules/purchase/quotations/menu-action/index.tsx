import { Fragment, } from "react";
import { Flex, MenuDivider, } from "@chakra-ui/react";

// import { checkUserAction } from "@/app/actions/modules";
import { MainModuleActionMenu } from "@/components/modules/main/menu-actions";

import ModuleSalesQuotationMenuActionBack from "@/components/modules/purchase/quotations/menu-action/action-back";
import ModuleSalesQuotationDetailMenuActionDelete from "@/components/modules/purchase/quotations/menu-action/action-delete";
import {
  ModulePurchaseQuotationsMenuBatch,
  ModulePurchaseQuotationsMenuCreate,
  ModulePurchaseQuotationsMenuEdit
} from "@/components/modules/purchase/quotations/menu-action/menu";

export default async function ModulePurchaseQuotationsMenuAction() {
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
            <ModulePurchaseQuotationsMenuCreate />
            <MenuDivider />
            <ModulePurchaseQuotationsMenuBatch />
          </Fragment>
        }
      />
    </Flex>
  )
}

export const ModulePurchaseQuotationsDetailMenuAction = async () => {
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
    return <ModuleSalesQuotationMenuActionBack />
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <ModuleSalesQuotationMenuActionBack />
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            {actionCreate && <ModulePurchaseQuotationsMenuCreate />}
            {actionUpdate && <ModulePurchaseQuotationsMenuEdit />}
            {actionDelete && <ModuleSalesQuotationDetailMenuActionDelete />}
            {actionCreate && (
              <Fragment>
                <MenuDivider />
                <ModulePurchaseQuotationsMenuBatch />
              </Fragment>
            )}
          </Fragment>
        }
      />
    </Flex>
  )
}
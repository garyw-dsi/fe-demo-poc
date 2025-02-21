import { Fragment } from "react";
import { Flex, MenuDivider, } from "@chakra-ui/react";

import { checkUserAction } from "@/app/actions/modules";

import { MainModuleActionMenu } from "@/components/modules/main/menu-actions";
import ModuleSalesQuotationMenuActionBack from "@/components/modules/sales/quotations/menu-action/action-back";
import ModuleSalesQuotationDetailMenuActionDelete from "@/components/modules/sales/quotations/menu-action/action-delete";
import {
  ModuleSalesQuotationsMenuBatch,
  ModuleSalesQuotationsMenuCreate,
  ModuleSalesQuotationsMenuEdit
} from "@/components/modules/sales/quotations/menu-action/menu";

export default async function ModuleSalesQuotationsMenuAction() {
  const actionCreate = await checkUserAction({ action: "create_quotation" });

  if (!actionCreate) {
    return null
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            <ModuleSalesQuotationsMenuCreate />
            <MenuDivider />
            <ModuleSalesQuotationsMenuBatch />
          </Fragment>
        }
      />
    </Flex>
  )
}

export const ModuleSalesQuotationsDetailMenuAction = async ({
  editable = true
}: {
  editable?: boolean;
}) => {
  const [
    actionCreate, actionUpdate, actionDelete
  ] = await Promise.all([
    checkUserAction({ action: "create_quotation" }),
    checkUserAction({ action: "update_quotation" }),
    checkUserAction({ action: "delete_quotation" }),
  ]);

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
            {actionCreate && <ModuleSalesQuotationsMenuCreate />}
            {(actionUpdate && editable) && <ModuleSalesQuotationsMenuEdit />}
            {actionDelete && <ModuleSalesQuotationDetailMenuActionDelete />}
            {actionCreate && (
              <Fragment>
                <MenuDivider />
                <ModuleSalesQuotationsMenuBatch />
              </Fragment>
            )}
          </Fragment>
        }
      />
    </Flex>
  )
}
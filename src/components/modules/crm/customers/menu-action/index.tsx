import { Fragment, } from "react";
import { Flex, MenuDivider, } from "@chakra-ui/react";

import { checkUserAction } from "@/app/actions/modules";
import { MainModuleActionMenu } from "@/components/modules/main/menu-actions";
import ModuleCRMCustomersMenuActionBack from "@/components/modules/crm/customers/menu-action/action-back";
import ModuleCRMCustomersDetailMenuActionDelete from "@/components/modules/crm/customers/menu-action/action-delete";
import {
  ModuleCRMCustomersMenuBatch,
  ModuleCRMCustomersMenuCreate,
  ModuleCRMCustomersMenuEdit
} from "@/components/modules/crm/customers/menu-action/menu";

export default async function ModuleCRMCustomersMenuAction() {
  const actionCreate = await checkUserAction({ action: "create_customer" });

  if (!actionCreate) {
    return null
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            <ModuleCRMCustomersMenuCreate />
            <MenuDivider />
            <ModuleCRMCustomersMenuBatch />
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
 * cid is contact id, it use for reference to delete customer data
 * and contact in core_sercice
 * 
 */
export const ModuleCRMCustomersDetailMenuAction = async ({
  cid
}: {
  cid: number;
}) => {
  const [
    actionCreate, actionUpdate, actionDelete
  ] = await Promise.all([
    checkUserAction({ action: "create_customer" }),
    checkUserAction({ action: "update_customer" }),
    checkUserAction({ action: "delete_customer" }),
  ]);

  if (
    !actionCreate &&
    !actionUpdate &&
    !actionDelete
  ) {
    return <ModuleCRMCustomersMenuActionBack />
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <ModuleCRMCustomersMenuActionBack />
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            {actionCreate && <ModuleCRMCustomersMenuCreate />}
            {actionUpdate && <ModuleCRMCustomersMenuEdit />}
            {actionDelete && <ModuleCRMCustomersDetailMenuActionDelete cid={cid} />}
            {actionCreate && (
              <Fragment>
                <MenuDivider />
                <ModuleCRMCustomersMenuBatch />
              </Fragment>
            )}
          </Fragment>
        }
      />
    </Flex>
  )
}
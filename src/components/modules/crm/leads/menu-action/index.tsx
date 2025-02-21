import { Fragment, } from "react";
import { Flex, MenuDivider, } from "@chakra-ui/react";

import { checkUserAction } from "@/app/actions/modules";
import { MainModuleActionMenu } from "@/components/modules/main/menu-actions";

import ModuleCRMLeadMenuActionBack from "@/components/modules/crm/leads/menu-action/action-back";
import ModuleCRMLeadDetailMenuActionDelete from "@/components/modules/crm/leads/menu-action/action-delete";
import {
  ModuleCRMLeadsMenuBatch,
  ModuleCRMLeadsMenuCreate,
  ModuleCRMLeadsMenuEdit
} from "@/components/modules/crm/leads/menu-action/menu";

export default async function ModuleCRMLeadsMenuAction() {
  const actionCreate = await checkUserAction({ action: "create_lead" });

  if (!actionCreate) {
    return null
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            <ModuleCRMLeadsMenuCreate />
            <MenuDivider />
            <ModuleCRMLeadsMenuBatch />
          </Fragment>
        }
      />
    </Flex>
  )
}

export const ModuleCRMLeadsDetailMenuAction = async () => {
  const [
    actionCreate, actionUpdate, actionDelete
  ] = await Promise.all([
    checkUserAction({ action: "create_lead" }),
    checkUserAction({ action: "update_lead" }),
    checkUserAction({ action: "delete_lead" }),
  ]);

  if (
    !actionCreate &&
    !actionUpdate &&
    !actionDelete
  ) {
    return <ModuleCRMLeadMenuActionBack />
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <ModuleCRMLeadMenuActionBack />
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            {actionCreate && <ModuleCRMLeadsMenuCreate />}
            {actionUpdate && <ModuleCRMLeadsMenuEdit />}
            {actionDelete && <ModuleCRMLeadDetailMenuActionDelete />}
            {actionCreate && (
              <Fragment>
                <MenuDivider />
                <ModuleCRMLeadsMenuBatch />
              </Fragment>
            )}
          </Fragment>
        }
      />
    </Flex>
  )
}
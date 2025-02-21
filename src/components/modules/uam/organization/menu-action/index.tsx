import { Fragment, } from "react";
import { Flex, MenuDivider, } from "@chakra-ui/react";

import { checkUserAction } from "@/app/actions/modules";
import { MainModuleActionMenu } from "@/components/modules/main/menu-actions";
import ModuleUAMOrganizationMenuActionTransferMaintain from "@/components/modules/uam/organization/menu-action/action-transfer-maintain";
import {
  ModuleUAMOrganizationMenuBatch,
  ModuleUAMOrganizationMenuEdit
} from "@/components/modules/uam/organization/menu-action/menu";

export default async function ModuleUAMOrganizationMenuAction() {
  const actionUpdate = await checkUserAction({ action: "update_organization" });

  if (!actionUpdate) {
    return null
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <ModuleUAMOrganizationMenuActionTransferMaintain />
      <MainModuleActionMenu
        listMenu={
          <Fragment>
            <ModuleUAMOrganizationMenuEdit />
            <MenuDivider />
            <ModuleUAMOrganizationMenuBatch />
          </Fragment>
        }
      />
    </Flex>
  )
}
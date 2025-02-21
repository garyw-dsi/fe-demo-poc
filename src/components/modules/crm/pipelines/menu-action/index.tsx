import { Flex } from "@chakra-ui/react";

import { checkUserAction } from "@/app/actions/modules";
import { MainModuleActionMenu } from "@/components/modules/main/menu-actions";
import { ModuleCRMPipelineMenuCreate } from "@/components/modules/crm/pipelines/menu-action/menu";

export default async function ModuleCRMPipelinesMenuAction() {
  const actionCreate = await checkUserAction({ action: "create_lead" });

  if (!actionCreate) {
    return null
  }

  return (
    <Flex gap={3} align={'stretch'}>
      <MainModuleActionMenu
        listMenu={
          <ModuleCRMPipelineMenuCreate />
        }
      />
    </Flex>
  )
}
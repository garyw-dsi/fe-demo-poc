import MainModuleHeader from "@/components/modules/main/header";
import { Flex } from "@chakra-ui/react";
import ModuleError from "@/components/modules/error";
import { getMyOrganization } from "@/app/actions/modules/uam/organization";
import ModuleUAMOrganizationHistory from "@/components/modules/uam/organization/history";
import ModuleUAMOrganization from "@/components/modules/uam/organization";
import ModuleUAMTransferMaintainOrg from "@/components/modules/uam/organization/maintain/form";
import ModuleUAMOrganizationMenuAction from "@/components/modules/uam/organization/menu-action";

export const dynamic = "force-dynamic";

export default async function ModuleUAMOrganizationEditPage() {
  const organization = await getMyOrganization();

  if (!organization) {
    return (
      <ModuleError message={"Error fetching organization data"} />
    )
  }

  return (
    <Flex
      w={'full'}
      direction={'column'}
      p={5}
      gap={5}
      flex={1}
    >
      <MainModuleHeader
        title="Maintain Organization"
        actions={<ModuleUAMOrganizationMenuAction />}
        withViewHelper={false}
      />

      {organization && (
        <Flex
          flex={1}
          justify={"space-between"}
          direction={{ base: "column", md: "row" }}
          flexWrap={'wrap'}
          gap={10}
        >
          <Flex
            direction={"column"}
            flex={1}
            maxW={{ base: 'full', md: "md" }}
            gap={5}
          >
            <ModuleUAMOrganization organization={organization} />
            <ModuleUAMTransferMaintainOrg initialMaintain={organization} />
          </Flex>
          <ModuleUAMOrganizationHistory history={organization} />
        </Flex>
      )}
    </Flex>
  )
}
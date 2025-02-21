import MainModuleHeader from "@/components/modules/main/header";
import { Flex } from "@chakra-ui/react";
import ModuleError from "@/components/modules/error";
import { getMyOrganization } from "@/app/actions/modules/uam/organization";
import ModuleUAMOrganizationHistory from "@/components/modules/uam/organization/history";
import ModuleUAMOrganizationMenuAction from "@/components/modules/uam/organization/menu-action";
import ModuleUAMOrganizationEditForm from "@/components/modules/uam/organization/edit/form";

export const dynamic = "force-dynamic";

export default async function ModuleUAMOrganizationEditPage() {
  const data = await getMyOrganization();

  if (!data) {
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
        title="Edit Organization"
        actions={<ModuleUAMOrganizationMenuAction />}
        withViewHelper={false}
      />

      {data && (
        <Flex
          flex={1}
          justify={"space-between"}
          direction={{ base: "column", xl: "row" }}
          flexWrap={{ base: "wrap", xl: "nowrap" }}
          gap={10}
        >
          <Flex
            direction={"column"}
            w={{ base: 'full' }}
            maxW={{ base: 'full' }}
            gap={5}
          >
            <ModuleUAMOrganizationEditForm data={data} />
          </Flex>
          <ModuleUAMOrganizationHistory history={data} />
        </Flex>
      )}
    </Flex>
  )
}
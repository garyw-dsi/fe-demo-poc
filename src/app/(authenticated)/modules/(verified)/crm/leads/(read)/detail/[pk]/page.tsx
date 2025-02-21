import { redirect } from "next/navigation";
import { Flex } from "@chakra-ui/react";

import MainModuleHeader from "@/components/modules/main/header";
import { checkUserAction } from "@/app/actions/modules";
import ModuleError from "@/components/modules/error";

import { ModuleCRMLeadsDetailMenuAction } from "@/components/modules/crm/leads/menu-action";
import { getLead } from "@/app/actions/modules/crm/leads";
import ModuleCRMLeadDetailHistory from "@/components/modules/crm/leads/detail/history";
import ModuleCRMReadLeadDetail from "@/components/modules/crm/leads/detail/lead-detail";
import ModuleCRMLeadReadInformation from "@/components/modules/crm/leads/detail/lead-information";
import ModuleCRMLeadStatus from "@/components/modules/crm/leads/lead-status";
import ModuleCRMLeadAction from "@/components/modules/crm/leads/lead-action";
import ModuleCRMLeadIdInformation from "@/components/modules/crm/leads/detail/lead-id-information";

export const dynamic = "force-dynamic";

interface PageProps {
  params: {
    pk: string;
  }
}

export default async function ModuleCRMLeadDetailPage({
  params
}: PageProps) {
  const pk = Number(params.pk)

  if (!pk) {
    redirect("/modules/crm/leads")
  }

  const { data, message, status } = await getLead({ pk });
  const userCanUpdate = await checkUserAction({ action: "update_lead" });

  if (status === 'error') {
    return <ModuleError message={message as string} />
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
        title="Detail Lead"
        actions={<ModuleCRMLeadsDetailMenuAction />}
        withViewHelper={false}
      />

      {data && (
        <Flex
          flex={1}
          justify={"space-between"}
          direction={{ base: "column", lg: "row" }}
          flexWrap={'wrap'}
          gap={10}
        >
          <Flex
            direction={"column"}
            flex={1}
            maxW={{ base: 'full', lg: "55vw" }}
            gap={5}
          >
            <Flex
              justify={'space-between'}
              w={'full'}
              direction={{ base: "column-reverse", md: "row" }}
              gap={{ base: 5, lg: 0 }}
            >
              <ModuleCRMLeadAction data={data} />
              <ModuleCRMLeadStatus data={data} userCanUpdate={userCanUpdate} />
            </Flex>
            <ModuleCRMLeadIdInformation leadId={data.lead_id} />
            <ModuleCRMReadLeadDetail data={data} />
            <ModuleCRMLeadReadInformation data={data} />
          </Flex>
          <ModuleCRMLeadDetailHistory history={data} />
        </Flex>
      )}
    </Flex>
  )
}
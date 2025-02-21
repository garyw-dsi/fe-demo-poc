import { redirect } from "next/navigation";
import { Flex } from "@chakra-ui/react";

import { getLead } from "@/app/actions/modules/crm/leads";
import { formattedStdPhone } from "@/utils/formatted-std-phone";
import { components } from "@/libs/api/schema/crm";

import { ModuleCRMLeadsDetailMenuAction } from "@/components/modules/crm/leads/menu-action";
import MainModuleHeader from "@/components/modules/main/header";
import ModuleError from "@/components/modules/error";
import ModuleCRMLeadDetailHistory from "@/components/modules/crm/leads/detail/history";
import ModuleCRMLeadEditForm from "@/components/modules/crm/leads/edit/form";
import ModuleCRMLeadStatus from "@/components/modules/crm/leads/lead-status";
import { checkUserAction } from "@/app/actions/modules";

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

  const {
    phone_code,
    phone
  } = formattedStdPhone(data?.phone || "");

  const newFormattedLead = {
    ...data as components['schemas']['Lead'],
    phone_code,
    phone
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
        title="Edit Lead"
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
            <ModuleCRMLeadEditForm
              data={newFormattedLead}
              leadStatus={
                <ModuleCRMLeadStatus
                  data={data}
                  userCanUpdate={userCanUpdate}
                />
              }
            />
          </Flex>
          <ModuleCRMLeadDetailHistory history={data} />
        </Flex>
      )}
    </Flex>
  )
}
import ModuleCRMLeadCreateForm from "@/components/modules/crm/leads/create/form";
import ModuleCRMLeadMenuActionBack from "@/components/modules/crm/leads/menu-action/action-back";
import MainModuleHeader from "@/components/modules/main/header";
import { Flex } from "@chakra-ui/react";

export const dynamic = 'force-dynamic';

export default function ModuleCRMLeadCreatePage() {
  return (
    <Flex
      w={'full'}
      direction={'column'}
      p={5}
      gap={5}
      flex={1}
    >
      <MainModuleHeader
        title="Create Lead"
        withViewHelper={false}
        actions={<ModuleCRMLeadMenuActionBack />}
      />
      <ModuleCRMLeadCreateForm />
    </Flex>
  )
}
import { Flex } from "@chakra-ui/react";
import ModuleCRMCustomerCreateForm from "@/components/modules/crm/customers/create/form";
import MainModuleHeader from "@/components/modules/main/header";
import ModuleCRMCustomersMenuActionBack from "@/components/modules/crm/customers/menu-action/action-back";

export const dynamic = 'force-dynamic';

export default function ModuleCRMCustomersCreatePage() {
  return (
    <Flex
      w={'full'}
      direction={'column'}
      p={5}
      gap={5}
      flex={1}
    >
      <MainModuleHeader
        title="Create Customer"
        withViewHelper={false}
        actions={<ModuleCRMCustomersMenuActionBack />}
      />
      <ModuleCRMCustomerCreateForm />
    </Flex>
  )
}
import { Flex } from "@chakra-ui/react";
import MainModuleHeader from "@/components/modules/main/header";
import ModuleContactCreateForm from "@/components/modules/core/contacts/create/form";
import ModuleContactsMenuActionBack from "@/components/modules/core/contacts/menu-action/action-back";

export const dynamic = 'force-dynamic';

export default function ModuleContactsCreatePage() {
  return (
    <Flex
      w={'full'}
      direction={'column'}
      p={5}
      gap={5}
      flex={1}
    >
      <MainModuleHeader
        title="Create Contact"
        withViewHelper={false}
        actions={<ModuleContactsMenuActionBack />}
      />
      <ModuleContactCreateForm />
    </Flex>
  )
}
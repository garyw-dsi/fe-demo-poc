import { Flex } from "@chakra-ui/react";
import MainModuleHeader from "@/components/modules/main/header";
import ModuleAccountingBanksMenuActionBack from "@/components/modules/accounting/banks/menu-action/action-back";
import ModuleAccountingBankCreateForm from "@/components/modules/accounting/banks/create/form";

export const dynamic = 'force-dynamic';

export default async function ModuleAccountingBankCreatePage() {
  return (
    <Flex
      w={'full'}
      direction={'column'}
      p={5}
      gap={5}
      flex={1}
    >
      <MainModuleHeader
        title="Create Bank"
        withViewHelper={false}
        actions={<ModuleAccountingBanksMenuActionBack />}
      />
      <ModuleAccountingBankCreateForm />
    </Flex>
  )
}
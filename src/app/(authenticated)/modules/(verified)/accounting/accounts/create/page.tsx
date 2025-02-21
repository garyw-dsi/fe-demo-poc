import { Flex } from "@chakra-ui/react";
import MainModuleHeader from "@/components/modules/main/header";
import ModuleAccountingAccountsMenuActionBack from "@/components/modules/accounting/accounts/menu-action/action-back";
import ModuleAccountingAccountCreateForm from "@/components/modules/accounting/accounts/create/form";
import { getAllCurrencyOption } from "@/app/actions/modules/core/currency";
import { getAllAccounts } from "@/app/actions/modules/accounting/accounts";

export const dynamic = 'force-dynamic';

export default async function ModuleAccountingAccountCreatePage() {
  const { data: accounts } = await getAllAccounts({ page: 1, page_size: 20 });
  const { data: currency } = await getAllCurrencyOption();

  return (
    <Flex
      w={'full'}
      direction={'column'}
      p={5}
      gap={5}
      flex={1}
    >
      <MainModuleHeader
        title="Create Account"
        withViewHelper={false}
        actions={<ModuleAccountingAccountsMenuActionBack />}
      />
      <ModuleAccountingAccountCreateForm
        currency={currency?.map((d) => {
          return {
            value: d.pk.toString(),
            label: `${d.symbol} (${d.name})`
          }
        })}
        accounts={accounts?.items.map((account) => {
          return {
            value: account.pk.toString(),
            label: account.name,
            ...account
          }
        })}
      />
    </Flex>
  )
}
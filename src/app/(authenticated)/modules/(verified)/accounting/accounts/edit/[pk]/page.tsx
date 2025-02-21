import { redirect } from "next/navigation";
import { Flex } from "@chakra-ui/react";
import { getAccount, getAllAccounts } from "@/app/actions/modules/accounting/accounts";

import { ModuleAccountingAccountsDetailMenuAction } from "@/components/modules/accounting/accounts/menu-action";
import ModuleAccountingAccountDetailHistory from "@/components/modules/accounting/accounts/detail/history";
import ModuleError from "@/components/modules/error";
import MainModuleHeader from "@/components/modules/main/header";
import ModuleAccountingAccountEditForm from "@/components/modules/accounting/accounts/edit/form";
import { getAllCurrencyOption } from "@/app/actions/modules/core/currency";

export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    pk: string;
  }
}

export default async function ModuleAccountingAccountEditPage({
  params
}: PageProps) {
  const pk = Number(params.pk);

  if (!pk) {
    redirect("/modules/accounting/accounts");
  }

  const { data, message, status } = await getAccount({ pk });
  const { data: accounts } = await getAllAccounts({ page: 1, page_size: 20 });
  const { data: currency } = await getAllCurrencyOption();

  if (status === "error") {
    return <ModuleError message={message} />
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
        title="Edit Account"
        actions={
          <ModuleAccountingAccountsDetailMenuAction />
        }
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
            <ModuleAccountingAccountEditForm
              initialData={data}
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
          <ModuleAccountingAccountDetailHistory history={data} />
        </Flex>
      )}
    </Flex>
  )
}
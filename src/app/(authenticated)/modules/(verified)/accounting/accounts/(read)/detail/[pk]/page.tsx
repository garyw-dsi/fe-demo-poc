import { redirect } from "next/navigation";
import { Flex } from "@chakra-ui/react";
import { getAccount } from "@/app/actions/modules/accounting/accounts";

import { ModuleAccountingAccountsDetailMenuAction } from "@/components/modules/accounting/accounts/menu-action";
import ModuleAccountingAccountDetail from "@/components/modules/accounting/accounts/detail/account-data";
import ModuleAccountingAccountDetailHistory from "@/components/modules/accounting/accounts/detail/history";
import ModuleError from "@/components/modules/error";
import MainModuleHeader from "@/components/modules/main/header";

export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    pk: string;
  }
}

export default async function ModuleAccountingAccountDetailPage({
  params
}: PageProps) {
  const pk = Number(params.pk);

  if (!pk) {
    redirect("/modules/accounting/accounts");
  }

  const { data, message, status } = await getAccount({ pk });

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
        title="Detail Account"
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
            <ModuleAccountingAccountDetail data={data} />
          </Flex>
          <ModuleAccountingAccountDetailHistory history={data} />
        </Flex>
      )}
    </Flex>
  )
}
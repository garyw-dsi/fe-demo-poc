import { redirect } from "next/navigation";
import { Flex } from "@chakra-ui/react";

import ModuleError from "@/components/modules/error";
import MainModuleHeader from "@/components/modules/main/header";
import { getBank } from "@/app/actions/modules/accounting/banks";
import { ModuleAccountingBanksDetailMenuAction } from "@/components/modules/accounting/banks/menu-action";
import ModuleAccountingBankDetailHistory from "@/components/modules/accounting/banks/detail/history";
import ModuleAccountingBankDetail from "@/components/modules/accounting/banks/detail";

export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    pk: string;
  }
}

export default async function ModuleAccountingBankDetailPage({
  params
}: PageProps) {
  const pk = Number(params.pk);

  if (!pk) {
    redirect("/modules/accounting/banks");
  }

  const { data, message, status } = await getBank({ pk });

  if (status === "error") {
    return <ModuleError message={message} />
  }

  console.log(data)

  return (
    <Flex
      w={'full'}
      direction={'column'}
      p={5}
      gap={5}
      flex={1}
    >
      <MainModuleHeader
        title="Detail Bank"
        actions={
          <ModuleAccountingBanksDetailMenuAction />
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
            <ModuleAccountingBankDetail data={data} />
          </Flex>
          <ModuleAccountingBankDetailHistory history={data} />
        </Flex>
      )}
    </Flex>
  )
}
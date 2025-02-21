import { redirect } from "next/navigation";
import { Flex } from "@chakra-ui/react";

import ModuleError from "@/components/modules/error";
import MainModuleHeader from "@/components/modules/main/header";
import { getJournal } from "@/app/actions/modules/accounting/journals";
import { ModuleAccountingJournalsDetailMenuAction } from "@/components/modules/accounting/journals/menu-action";
import ModuleAccountingJournalDetailHistory from "@/components/modules/accounting/journals/detail/history";
import ModuleAccountingJournalInformationDetail from "@/components/modules/accounting/journals/detail/journal-information";
import ModuleAccountingJournalItemsDetail from "@/components/modules/accounting/journals/detail/journal-items";

export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    pk: string;
  }
}

export default async function ModuleAccountingJournalDetailPage({
  params
}: PageProps) {
  const pk = Number(params.pk);

  if (!pk) {
    redirect("/modules/accounting/journals");
  }

  const { data, message, status } = await getJournal({ pk });

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
        title="Detail Journal"
        actions={
          <ModuleAccountingJournalsDetailMenuAction />
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
            <ModuleAccountingJournalInformationDetail data={data} />
            <ModuleAccountingJournalItemsDetail data={data} />
          </Flex>
          <ModuleAccountingJournalDetailHistory history={data} />
        </Flex>
      )}
    </Flex>
  )
}
import { getAllBanks } from "@/app/actions/modules/accounting/banks";
import ModuleAccountingBanksMenuAction from "@/components/modules/accounting/banks/menu-action";
import ModuleAccountingBanksKanbanView from "@/components/modules/accounting/banks/view-kanban";
import ModuleAccountingBanksTableView from "@/components/modules/accounting/banks/view-table";
import ModuleError from "@/components/modules/error";
import MainModuleHeader from "@/components/modules/main/header";
import Pagination from "@/components/pagination";
import { Flex } from "@chakra-ui/react";

export const dynamic = "force-dynamic";

type View = "kanban" | "table";

interface PageProps {
  searchParams: {
    view: View;
    page: number;
    page_size: number;
  }
}

const NotFound = () => (
  <Flex
    w={'full'}
    direction={'column'}
    gap={5}
    flex={1}
  >
    <Flex flex={1} align={'center'} justify={'center'}>
      No data found
    </Flex>
  </Flex>
)

export default async function ModuleAccountingBankReadPage({
  searchParams
}: PageProps) {
  const view = searchParams.view || "table";
  const page = Number(searchParams.page) || 1;
  const page_size = Number(searchParams.page_size) || 10;

  const { data, status, message } = await getAllBanks({
    page,
    page_size
  });

  if (status === "error") {
    return <ModuleError message={message as string} />
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
        title="Bank Managements"
        actions={<ModuleAccountingBanksMenuAction />}
        defaultView={view}
      />

      {(data && data.items.length > 0)
        ? (
          <Flex
            w={'full'}
            direction={'column'}
            gap={5}
            flex={1}
          >
            <Flex flex={1} align={'start'}>
              {view === "kanban"
                ? <ModuleAccountingBanksKanbanView datas={data.items} />
                : <ModuleAccountingBanksTableView datas={data.items} />
              }
            </Flex>
            <Pagination totalPages={data.total_page} />
          </Flex>
        )
        : <NotFound />
      }
    </Flex>
  )
}
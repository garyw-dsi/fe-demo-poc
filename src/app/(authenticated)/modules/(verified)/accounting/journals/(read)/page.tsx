import { getAllJournals } from "@/app/actions/modules/accounting/journals";
import ModuleAccountingJournalMenuAction from "@/components/modules/accounting/journals/menu-action";
import ModuleAccountingJournalsKanbanView from "@/components/modules/accounting/journals/view-kanban";
import ModuleAccountingJournalsTableView from "@/components/modules/accounting/journals/view-table";
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

export default async function ModuleAccountingJournalsReadPage({
  searchParams
}: PageProps) {
  const view = searchParams.view || "table";
  const page = Number(searchParams.page) || 1;
  const page_size = Number(searchParams.page_size) || 10;

  const { data, status, message } = await getAllJournals({
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
        title="Journal Managements"
        actions={<ModuleAccountingJournalMenuAction />}
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
                ? <ModuleAccountingJournalsKanbanView datas={data.items} />
                : <ModuleAccountingJournalsTableView datas={data.items} />
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
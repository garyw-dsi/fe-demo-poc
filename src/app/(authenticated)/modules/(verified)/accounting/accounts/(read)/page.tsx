import { Flex } from "@chakra-ui/react";
import { getAllAccounts } from "@/app/actions/modules/accounting/accounts";

import ModuleAccountingAccountsMenuAction from "@/components/modules/accounting/accounts/menu-action";
import ModuleAccountingAccountsKanbanView from "@/components/modules/accounting/accounts/view-kanban";
import ModuleError from "@/components/modules/error";
import MainModuleHeader from "@/components/modules/main/header";
import Pagination from "@/components/pagination";
import ModuleAccountingAccountsTableView from "@/components/modules/accounting/accounts/view-table";
import ModuleAccountingAccountsSearch from "@/components/modules/accounting/accounts/search";

export const dynamic = 'force-dynamic';

type View = "kanban" | "table";

interface PageProps {
  searchParams: {
    view?: View;
    page?: number;
    page_size?: number;
    name?: string;
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

export default async function ModuleAccountingAccountReadPage({
  searchParams
}: PageProps) {
  const view = searchParams.view || "table";
  const page = searchParams.page || 1;
  const page_size = searchParams.page_size || 10;
  const name = searchParams.name || undefined;

  const { data, status, message } = await getAllAccounts({
    page: page,
    page_size: page_size,
    name: name || undefined
  });

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
        title="Accounts Managements"
        actions={<ModuleAccountingAccountsMenuAction />}
        search={<ModuleAccountingAccountsSearch />}
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
                ? <ModuleAccountingAccountsKanbanView datas={data.items} />
                : <ModuleAccountingAccountsTableView datas={data.items} />
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
import { getAllCustomerAccounting } from "@/app/actions/modules/accounting/customers";
import ModuleAccountingCustomersMenuAction from "@/components/modules/accounting/customers/menu-action";
import ModuleAccountingCustomersKanbanView from "@/components/modules/accounting/customers/view-kanban";
import ModuleAccountingCustomersTableView from "@/components/modules/accounting/customers/view-table";
import ModuleError from "@/components/modules/error";
import MainModuleHeader from "@/components/modules/main/header";
import Pagination from "@/components/pagination";
import { Flex } from "@chakra-ui/react";

export const dynamic = "force-dynamic";

type View = "kanban" | "table";

interface PageProps {
  searchParams: {
    view?: View;
    page?: number;
    page_size?: number;
  }
}

const NoData = () => (
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

export default async function ModuleAccountingCustomersPage({
  searchParams
}: PageProps) {
  const view = searchParams.view || "table";
  const page = searchParams.page || 1;
  const page_size = searchParams.page_size || 10;

  const { status, message, data } = await getAllCustomerAccounting({
    page: page,
    page_size: page_size,
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
        title="Customers Managements"
        actions={<ModuleAccountingCustomersMenuAction />}
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
                ? <ModuleAccountingCustomersKanbanView datas={data.items} />
                : <ModuleAccountingCustomersTableView datas={data.items} />
              }
            </Flex>
            <Pagination totalPages={data?.total_page as number} />
          </Flex>
        )
        : <NoData />
      }
    </Flex>
  )
}
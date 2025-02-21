import { Flex } from "@chakra-ui/react";
import { getAllOrders } from "@/app/actions/modules/sales/orders";

import MainModuleHeader from "@/components/modules/main/header";
import Pagination from "@/components/pagination";
import ModuleError from "@/components/modules/error";
import ModuleSalesOrdersKanbanView from "@/components/modules/sales/orders/view-kanban";
import ModuleSalesOrdersTableView from "@/components/modules/sales/orders/view-table";
import ModuleSalesOrdersMenuAction from "@/components/modules/sales/orders/menu-action";
import { components } from "@/libs/api/schema/sales";
import ModuleSalesOrderSearch from "@/components/modules/sales/orders/search";
import ModuleSalesOrderFilter from "@/components/modules/sales/orders/filter";

export const dynamic = "force-dynamic";

type View = "kanban" | "table";

interface PageProps {
  searchParams: {
    view?: View;
    page?: number;
    page_size?: number;
    delivery_term?: components['schemas']['Order']['delivery_term'];
    order_id?: string;
    status?: components['schemas']['Order']['status'];
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

export default async function ModuleSalesOrdersReadPage({
  searchParams
}: PageProps) {
  const view = searchParams.view || "table";

  const page = searchParams.page || 1;
  const page_size = searchParams.page_size || 10;
  const delivery_terms = searchParams.delivery_term;
  const status = searchParams.status;
  const orderId = searchParams.order_id;

  const { data, status: responseStatus, message } = await getAllOrders({
    page: page,
    page_size: page_size,
    delivery_terms: delivery_terms,
    status: status,
    orderId: orderId,
  });

  if (responseStatus === "error") {
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
        title="Orders Managements"
        actions={<ModuleSalesOrdersMenuAction />}
        search={<ModuleSalesOrderSearch />}
        filter={<ModuleSalesOrderFilter />}
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
              {view === 'kanban'
                ? <ModuleSalesOrdersKanbanView datas={data.items} />
                : <ModuleSalesOrdersTableView datas={data.items} />
              }
            </Flex>
            <Pagination totalPages={data.total_page} />
          </Flex>
        )
        : <NoData />
      }
    </Flex>
  )
}
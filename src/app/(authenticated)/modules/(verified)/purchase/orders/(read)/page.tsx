import { Flex } from "@chakra-ui/react";
import { getAllOrders } from "@/app/actions/modules/purchase/orders"

import Pagination from "@/components/pagination";
import ModuleError from "@/components/modules/error";

import MainModuleHeader from "@/components/modules/main/header";
import ModulePurchaseOrdersKanbanView from "@/components/modules/purchase/orders/view-kanban";
import ModulePurchaseOrdersTableView from "@/components/modules/purchase/orders/view-table";
import ModulePurchaseOrdersMenuAction from "@/components/modules/purchase/orders/menu-action";

export const dynamic = "force-dynamic";

type View = "kanban" | "table"

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

export default async function ModulePurchaseOrdersReadPage({
  searchParams
}: PageProps) {
  const view = searchParams.view || "kanban";
  const page = searchParams.page || 1;
  const page_size = searchParams.page_size || 10;

  const { data, message, status } = await getAllOrders({
    page: page,
    page_size: page_size
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
        title="Order Managements"
        actions={<ModulePurchaseOrdersMenuAction />}
      />

      {data
        ? (
          <Flex
            w={'full'}
            direction={'column'}
            gap={5}
            flex={1}
          >
            <Flex flex={1} align={'start'}>
              {view === 'kanban'
                ? <ModulePurchaseOrdersKanbanView datas={data.items} />
                : <ModulePurchaseOrdersTableView datas={data.items} />
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
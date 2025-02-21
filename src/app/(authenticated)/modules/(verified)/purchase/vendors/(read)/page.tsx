import { Flex } from "@chakra-ui/react";
import { getAllVendor } from "@/app/actions/modules/purchase/vendors";

import ModuleError from "@/components/modules/error";
import Pagination from "@/components/pagination";
import MainModuleHeader from "@/components/modules/main/header";

import ModulePurchaseVendorsMenuAction from "@/components/modules/purchase/vendors/menu-action";
import ModulePurchaseVendorsKanbanView from "@/components/modules/purchase/vendors/view-kanban";
import ModulePurchaseVendorsTableView from "@/components/modules/purchase/vendors/view-table";

export const dynamic = "force-dynamic";

type View = "kanban" | "table";

interface PageProps {
  searchParams: {
    view?: View;
    page?: number;
    page_size?: number;
  }
}

export default async function ModulePurchaseVendorsReadPage({
  searchParams
}: PageProps) {
  const view = searchParams.view || "kanban";

  const page = searchParams.page || 1;
  const page_size = searchParams.page_size || 10;

  const { data, message, status } = await getAllVendor({
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
        title="Vendor Managements"
        actions={<ModulePurchaseVendorsMenuAction />}
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
                ? <ModulePurchaseVendorsKanbanView datas={data.items} />
                : <ModulePurchaseVendorsTableView datas={data.items} />
              }
            </Flex>
            <Pagination totalPages={data?.total_page as number} />
          </Flex>
        ) : (
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
      }
    </Flex>
  )
}
import { Flex } from "@chakra-ui/react";
import { getAllRequisitions } from "@/app/actions/modules/purchase/requisitions";

import MainModuleHeader from "@/components/modules/main/header";
import Pagination from "@/components/pagination";
import ModuleError from "@/components/modules/error";
import ModulePurchaseRequisitionsKanbanView from "@/components/modules/purchase/requisitions/view-kanban";
import ModulePurchaseRequisitionsTableView from "@/components/modules/purchase/requisitions/view-table";
import ModulePurchaseRequisitionsMenuAction from "@/components/modules/purchase/requisitions/menu-action";

export const dynamic = "force-dynamic";

type View = "kanban" | "table";

interface PageProps {
  searchParams: {
    view?: View;
    page?: number;
    page_size?: number;
  }
}

export default async function ModulePurchaseRequisitionsReadPage({
  searchParams
}: PageProps) {
  const view = searchParams.view || "kanban";
  const page = searchParams.page || 1;
  const page_size = searchParams.page_size || 10;

  const { data, status, message } = await getAllRequisitions({
    page: page,
    page_size: page_size
  });

  if (status === "error") {
    return <ModuleError message={message as string} />
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
        title="Requisition Managements"
        actions={<ModulePurchaseRequisitionsMenuAction />}
      />

      {data && (
        <Flex
          w={'full'}
          direction={'column'}
          gap={5}
          flex={1}
        >
          <Flex flex={1} align={'start'}>
            {view === 'kanban'
              ? <ModulePurchaseRequisitionsKanbanView datas={data.items} />
              : <ModulePurchaseRequisitionsTableView datas={data.items} />
            }
          </Flex>
          <Pagination totalPages={data.total_page} />
        </Flex>
      )}
    </Flex>
  )
}
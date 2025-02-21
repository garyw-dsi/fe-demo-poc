import { Flex } from "@chakra-ui/react";
import { getAllQuotations } from "@/app/actions/modules/purchase/quotations";

import MainModuleHeader from "@/components/modules/main/header";
import Pagination from "@/components/pagination";
import ModuleError from "@/components/modules/error";
import ModulePurchaseQuotationsKanbanView from "@/components/modules/purchase/quotations/view-kanban";
import ModulePurchaseQuotationsTableView from "@/components/modules/purchase/quotations/view-table";
import ModulePurchaseQuotationsMenuAction from "@/components/modules/purchase/quotations/menu-action";

export const dynamic = "force-dynamic";

type View = "kanban" | "table";

interface PageProps {
  searchParams: {
    view?: View;
    page?: number;
    page_size?: number;
  }
}

export default async function ModulePurchaseQuotationsReadPage({
  searchParams
}: PageProps) {
  const view = searchParams.view || "kanban";
  const page = searchParams.page || 1;
  const page_size = searchParams.page_size || 10;

  const { data, status, message } = await getAllQuotations({
    page: page,
    page_size: page_size
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
        title="Quotations Managements"
        actions={<ModulePurchaseQuotationsMenuAction />}
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
              ? <ModulePurchaseQuotationsKanbanView datas={data.items} />
              : <ModulePurchaseQuotationsTableView datas={data.items} />
            }
          </Flex>
          <Pagination totalPages={data.total_page} />
        </Flex>
      )}
    </Flex>
  )
}
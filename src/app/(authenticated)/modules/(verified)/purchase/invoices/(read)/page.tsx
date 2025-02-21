import { Flex } from "@chakra-ui/react";
import { getAllInvoices } from "@/app/actions/modules/purchase/invoices";

import MainModuleHeader from "@/components/modules/main/header";
import Pagination from "@/components/pagination";
import ModuleError from "@/components/modules/error";
import ModulePurchaseInvoicesKanbanView from "@/components/modules/purchase/invoices/view-kanban";
import ModulePurchaseInvoicesTableView from "@/components/modules/purchase/invoices/view-table";
import ModulePurchaseInvoicesMenuAction from "@/components/modules/purchase/invoices/menu-action";

export const dynamic = "force-dynamic";

type View = "kanban" | "table";

interface PageProps {
  searchParams: {
    view?: View;
    page?: number;
    page_size?: number;
  }
}

export default async function ModulePurchaseInvoicesReadPage({
  searchParams
}: PageProps) {
  const view = searchParams.view || "kanban";
  const page = searchParams.page || 1;
  const page_size = searchParams.page_size || 10;

  const { data, status, message } = await getAllInvoices({
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
        title="Invoice Managements"
        actions={<ModulePurchaseInvoicesMenuAction />}
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
              ? <ModulePurchaseInvoicesKanbanView datas={data.items} />
              : <ModulePurchaseInvoicesTableView datas={data.items} />
            }
          </Flex>
          <Pagination totalPages={data.total_page} />
        </Flex>
      )}
    </Flex>
  )
}
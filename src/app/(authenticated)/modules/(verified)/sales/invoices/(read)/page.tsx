import { Flex } from "@chakra-ui/react";
import { getAllInvoices } from "@/app/actions/modules/sales/invoices";

import MainModuleHeader from "@/components/modules/main/header";
import Pagination from "@/components/pagination";
import ModuleError from "@/components/modules/error";
import ModuleSalesInvoicesMenuAction from "@/components/modules/sales/invoices/menu-action";
import ModuleSalesInvoicesKanbanView from "@/components/modules/sales/invoices/view-kanban";
import ModuleSalesInvoicesTableView from "@/components/modules/sales/invoices/view-table";
import { components } from "@/libs/api/schema/sales";
import ModuleSalesInvoiceSearch from "@/components/modules/sales/invoices/search";
import ModuleSalesInvoiceFilter from "@/components/modules/sales/invoices/filter";

export const dynamic = "force-dynamic";

type View = "kanban" | "table";

interface PageProps {
  searchParams: {
    view?: View;
    page?: number;
    page_size?: number;
    invoice_id?: string;
    status: components['schemas']['InvoiceStatus'];
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

export default async function ModuleSalesInvoicesReadPage({
  searchParams
}: PageProps) {
  const view = searchParams.view || "table";

  const page = searchParams.page || 1;
  const page_size = searchParams.page_size || 10;
  const status = searchParams.status;
  const invoiceId = searchParams.invoice_id;

  const { data, status: responseStatus, message } = await getAllInvoices({
    page: page,
    page_size: page_size,
    status: status,
    invoiceId: invoiceId
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
        title="Invoice Managements"
        actions={<ModuleSalesInvoicesMenuAction />}
        search={<ModuleSalesInvoiceSearch />}
        filter={<ModuleSalesInvoiceFilter />}
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
                ? <ModuleSalesInvoicesKanbanView datas={data.items} />
                : <ModuleSalesInvoicesTableView datas={data.items} />
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
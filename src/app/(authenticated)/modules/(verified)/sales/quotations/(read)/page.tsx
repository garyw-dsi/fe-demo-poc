import { Flex } from "@chakra-ui/react";
import { getAllQuotations } from "@/app/actions/modules/sales/quotations";

import MainModuleHeader from "@/components/modules/main/header";
import ModuleSalesQuotationsMenuAction from "@/components/modules/sales/quotations/menu-action";
import Pagination from "@/components/pagination";
import ModuleError from "@/components/modules/error";
import ModuleSalesQuotationsKanbanView from "@/components/modules/sales/quotations/view-kanban";
import ModuleSalesQuotationsTableView from "@/components/modules/sales/quotations/view-table";
import { components } from "@/libs/api/schema/sales";
import ModuleSalesQuotationSearch from "@/components/modules/sales/quotations/search";
import ModulesSalesQuotationFilter from "@/components/modules/sales/quotations/filter";

export const dynamic = "force-dynamic";

type View = "kanban" | "table";

interface PageProps {
  searchParams: {
    view?: View;
    page?: number;
    page_size?: number;
    status?: components['schemas']['Quotation']['status'];
    payment_term?: components['schemas']['Quotation']['payment_term'];
    delivery_term?: components['schemas']['Quotation']['delivery_term'];
    quotation_id?: string;
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

export default async function ModuleSalesQuotationsReadPage({
  searchParams
}: PageProps) {
  const view = searchParams.view || "table";
  const page = searchParams.page || 1;
  const page_size = searchParams.page_size || 10;

  const status = searchParams.status || undefined;
  const payment_term = searchParams.payment_term || undefined;
  const delivery_term = searchParams.delivery_term || undefined;
  const quotation_id = searchParams.quotation_id || undefined;

  const { data, status: responseStatus, message } = await getAllQuotations({
    page: page,
    page_size: page_size,
    status: status,
    payment_term: payment_term,
    delivery_term: delivery_term,
    quotation_id: quotation_id
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
        title="Quotations Managements"
        actions={<ModuleSalesQuotationsMenuAction />}
        search={<ModuleSalesQuotationSearch />}
        filter={<ModulesSalesQuotationFilter />}
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
                ? <ModuleSalesQuotationsKanbanView datas={data.items} />
                : <ModuleSalesQuotationsTableView datas={data.items} />
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
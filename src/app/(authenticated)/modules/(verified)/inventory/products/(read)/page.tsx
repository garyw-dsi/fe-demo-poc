import { Flex } from "@chakra-ui/react";
import { getAllProducts } from "@/app/actions/modules/inventory/products";
import { components } from "@/libs/api/schema/inventory";

import ModuleInventoryProductFilter from "@/components/modules/inventory/products/filter";
import ModuleInventoryProductMenuAction from "@/components/modules/inventory/products/menu-action";
import ModuleInventoryProductSearch from "@/components/modules/inventory/products/search";
import ModuleInventoryProductKanbanView from "@/components/modules/inventory/products/view-kanban";
import ModuleInventoryProductTableView from "@/components/modules/inventory/products/view-table";
import MainModuleHeader from "@/components/modules/main/header";
import Pagination from "@/components/pagination";
import ModuleError from "@/components/modules/error";

export const dynamic = "force-dynamic";

type View = "kanban" | "table";
interface PageProps {
  searchParams: {
    view: View;
    page: string;
    page_size: string;
    name: string;
    product_type: components["schemas"]["ProductType"];
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

export default async function ProductPage({ searchParams }: PageProps) {
  const view = searchParams.view || 'kanban';

  const page = Number(searchParams.page) || 1;
  const page_size = Number(searchParams.page_size) || 10;
  const name = searchParams.name || undefined;
  const product_type = searchParams.product_type || undefined;

  const { status, data, message } = await getAllProducts({
    page: page,
    page_size: page_size,
    name: name,
    product_type: product_type
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
        title="Products"
        actions={<ModuleInventoryProductMenuAction />}
        filter={<ModuleInventoryProductFilter />}
        search={<ModuleInventoryProductSearch />}
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
                ? <ModuleInventoryProductKanbanView datas={data.items} />
                : <ModuleInventoryProductTableView datas={data.items} />
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
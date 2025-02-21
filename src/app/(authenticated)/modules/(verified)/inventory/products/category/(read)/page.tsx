import { Flex } from "@chakra-ui/react";
import MainModuleHeader from "@/components/modules/main/header";
import Pagination from "@/components/pagination";
import ModuleInventoryProductCategoryMenuAction from "@/components/modules/inventory/products-category/menu-action";
import { getAllProductsCategory } from "@/app/actions/modules/inventory/products-category";
import ModuleError from "@/components/modules/error";
import ModuleInventoryProductCategoryTableView from "@/components/modules/inventory/products-category/view-table";
import ModuleInventoryProductCategoryKanbanView from "@/components/modules/inventory/products-category/view-kanban";

export const dynamic = "force-dynamic";

type View = "kanban" | "table";

interface PageProps {
  searchParams: {
    view: View;
    page: string;
    page_size: string;
    name: string;
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

export default async function ModuleInventoryProductCategoryReadPage({
  searchParams
}: PageProps) {
  const view = searchParams.view || 'table';

  const page = Number(searchParams.page) || 1;
  const page_size = Number(searchParams.page_size) || 10;
  const name = searchParams.name || undefined;

  const { status, data, message } = await getAllProductsCategory({
    page: page,
    page_size: page_size,
    name: name,
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
        title="Products Category"
        actions={<ModuleInventoryProductCategoryMenuAction />}
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
                ? <ModuleInventoryProductCategoryKanbanView datas={data.items} />
                : <ModuleInventoryProductCategoryTableView datas={data.items} />
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
import { getAllTags } from "@/app/actions/modules/core/tags";
import ModuleTagMenuAction from "@/components/modules/core/tags/menu-action";
import ModuleTagsKanbanView from "@/components/modules/core/tags/view-kanban";
import ModuleTagsTableView from "@/components/modules/core/tags/view-table";
import ModuleError from "@/components/modules/error";
import MainModuleHeader from "@/components/modules/main/header";
import Pagination from "@/components/pagination";
import { Flex } from "@chakra-ui/react";

export const dynamic = "force-dynamic";

type View = "kanban" | "table"

interface PageProps {
  searchParams: {
    view: View;
    page: string;
    page_size: string;
    name: string;
  }
}

export default async function ModuleReadTagsPage({
  searchParams
}: PageProps) {
  const view = searchParams.view || "kanban";

  const page = Number(searchParams.page) || 1;
  const page_size = Number(searchParams.page_size) || 10;
  const name = searchParams.name || undefined;

  const { data, message, status } = await getAllTags({
    page: page,
    page_size: page_size,
    name: name
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
        title="Tags Management"
        actions={<ModuleTagMenuAction />}
      />

      {data && (
        <Flex
          w={'full'}
          direction={'column'}
          gap={5}
          flex={1}
        >
          <Flex flex={1} align={'start'}>
            {view === "kanban"
              ? <ModuleTagsKanbanView datas={data.items} />
              : <ModuleTagsTableView datas={data.items} />
            }
          </Flex>
          <Pagination totalPages={data?.total_page as number} />
        </Flex>
      )}
    </Flex>
  )
}
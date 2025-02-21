import { Flex } from "@chakra-ui/react";
import { getAllGroups } from "@/app/actions/modules/uam/groups";

import Pagination from "@/components/pagination";
import MainModuleHeader from "@/components/modules/main/header";
import ModuleUAMGroupKanbanView from "@/components/modules/uam/group/view-kanban";
import ModuleUAMGroupTableView from "@/components/modules/uam/group/view-table";
import ModuleError from "@/components/modules/error";
import ModuleUAMGroupMenuAction from "@/components/modules/uam/group/menu-action";
import ModuleUAMGroupSearch from "@/components/modules/uam/group/search";

export const dynamic = 'force-dynamic';

type View = "kanban" | "table";

interface PageProps {
  searchParams: {
    view?: View;
    page?: number;
    page_size?: number;
    name?: string;
  }
}

export default async function ModulesUAMGroupPage({
  searchParams
}: PageProps) {
  const view = searchParams.view || 'kanban';

  const page = searchParams.page || 1;
  const page_size = searchParams.page_size || 10;
  const name = searchParams.name || undefined;

  const { data, status, message } = await getAllGroups({
    page: page,
    page_size: page_size,
    name: name
  });

  if (status === "error") {
    return (
      <ModuleError message={message as string} />
    )
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
        title="Group Managements"
        actions={<ModuleUAMGroupMenuAction />}
        search={
          <ModuleUAMGroupSearch />
        }
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
              ? <ModuleUAMGroupKanbanView datas={data.items} />
              : <ModuleUAMGroupTableView datas={data.items} />
            }
          </Flex>
          <Pagination totalPages={data.total_page} />
        </Flex>
      )}
    </Flex>
  )
}
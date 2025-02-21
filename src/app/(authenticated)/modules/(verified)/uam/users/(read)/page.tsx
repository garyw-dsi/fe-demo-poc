import { Flex } from "@chakra-ui/react";
import { getAllUsers } from "@/app/actions/modules/uam/users";

import MainModuleHeader from "@/components/modules/main/header";
import ModuleUAMMenuAction from "@/components/modules/uam/user/menu-action";
import ModuleUAMKanbanView from "@/components/modules/uam/user/view-kanban";
import ModuleUAMTableView from "@/components/modules/uam/user/view-table";
import Pagination from "@/components/pagination";
import ModuleError from "@/components/modules/error";
import ModuleUAMUserSearch from "@/components/modules/uam/user/search";

export const dynamic = 'force-dynamic';

type View = "kanban" | "table";

interface PageProps {
  searchParams: {
    view?: View;
    page?: number;
    page_size?: number;
    email?: string;
    first_name?: string;
    last_name?: string;
    is_superuser?: boolean;
    is_active?: boolean;
    group_id?: boolean;
  }
}

export default async function ModulesUAMPage({
  searchParams
}: PageProps) {
  const view = searchParams.view || 'kanban';

  const page = searchParams.page || 1;
  const page_size = searchParams.page_size || 10;
  const email = searchParams.email || undefined;
  const first_name = searchParams.first_name || undefined;
  const last_name = searchParams.last_name || undefined;
  const is_superuser = searchParams.is_superuser || undefined;
  const is_active = searchParams.is_active || undefined;
  const group_id = searchParams.group_id || undefined;

  const { data, status, message } = await getAllUsers({
    page: page,
    page_size: page_size,
    email: email,
    first_name: first_name,
    last_name: last_name,
    is_superuser: is_superuser,
    is_active: is_active,
    group_id: group_id
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
        title="User Managements"
        actions={<ModuleUAMMenuAction />}
        search={<ModuleUAMUserSearch />}
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
              ? <ModuleUAMKanbanView datas={data.items} />
              : <ModuleUAMTableView datas={data.items} />
            }
          </Flex>
          <Pagination totalPages={data?.total_page as number} />
        </Flex>
      )}
    </Flex>
  )
}
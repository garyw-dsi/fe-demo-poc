import { Flex } from "@chakra-ui/react";
import { getAllDepartments } from "@/app/actions/modules/hr/departments";

import Pagination from "@/components/pagination";
import MainModuleHeader from "@/components/modules/main/header";
import ModuleError from "@/components/modules/error";
import ModuleHRDepartmentKanbanView from "@/components/modules/hr/departments/view-kanban";
import ModuleHRDepartmentTableView from "@/components/modules/hr/departments/view-table";
import ModuleHRDepartmentMenuAction from "@/components/modules/hr/departments/menu-action";
import ModuleHRDepartmentSearch from "@/components/modules/hr/departments/search";
import ModuleHRDepartmentFilter from "@/components/modules/hr/departments/filter";


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

export default async function ModulesHRDepartmentsReadPage({
  searchParams
}: PageProps) {
  const view = searchParams.view || 'kanban';

  const page = searchParams.page || 1;
  const page_size = searchParams.page_size || 10;
  const name = searchParams.name;

  const { data, status, message } = await getAllDepartments({
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
        title="Department Managements"
        actions={<ModuleHRDepartmentMenuAction />}
        search={<ModuleHRDepartmentSearch />}
        filter={<ModuleHRDepartmentFilter />}
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
              ? <ModuleHRDepartmentKanbanView datas={data.items} />
              : <ModuleHRDepartmentTableView datas={data.items} />
            }
          </Flex>
          <Pagination totalPages={data.total_page} />
        </Flex>
      )}
    </Flex>
  )
}
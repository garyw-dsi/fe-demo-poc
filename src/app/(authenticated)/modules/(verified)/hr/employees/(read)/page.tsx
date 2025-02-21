import { Flex } from "@chakra-ui/react";
import { getAllEmployees } from "@/app/actions/modules/hr/employees";

import MainModuleHeader from "@/components/modules/main/header";
import Pagination from "@/components/pagination";
import ModuleError from "@/components/modules/error";
import ModuleHREmployeesKanbanView from "@/components/modules/hr/employees/view-kanban";
import ModuleHREmployeesTableView from "@/components/modules/hr/employees/view-table";
import ModuleHREmployeeMenuAction from "@/components/modules/hr/employees/menu-action";
import ModuleHREmployeeSearch from "@/components/modules/hr/employees/search";
import ModuleHREmployeeFilter from "@/components/modules/hr/employees/filter";


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

export default async function ModulesHREmployeesReadPage({
  searchParams
}: PageProps) {
  const view = searchParams.view || 'kanban';

  const page = searchParams.page || 1;
  const page_size = searchParams.page_size || 10;
  const name = searchParams.name;

  const { data, status, message } = await getAllEmployees({
    page: page,
    page_size: page_size,
    name: name,
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
        title="Employee Managements"
        actions={<ModuleHREmployeeMenuAction />}
        search={<ModuleHREmployeeSearch />}
        filter={<ModuleHREmployeeFilter />}
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
              ? <ModuleHREmployeesKanbanView datas={data.items} />
              : <ModuleHREmployeesTableView datas={data.items} />
            }
          </Flex>
          <Pagination totalPages={data?.total_page as number} />
        </Flex>
      )}
    </Flex>
  )
}
import { Flex } from "@chakra-ui/react";
import { getAllPayrolls } from "@/app/actions/modules/hr/payrolls";

import Pagination from "@/components/pagination";
import MainModuleHeader from "@/components/modules/main/header";
import ModuleError from "@/components/modules/error";
import ModuleHRPayrollsKanbanView from "@/components/modules/hr/payrolls/view-kanban";
import ModuleHRPayrollTableView from "@/components/modules/hr/payrolls/view-table";
import ModuleHRPayrollMenuAction from "@/components/modules/hr/payrolls/menu-action";
import ModuleHRPayrollSearch from "@/components/modules/hr/payrolls/search";
import ModuleHRPayrollFilter from "@/components/modules/hr/payrolls/filter";


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

export default async function ModulesHRPayrollReadPage({
  searchParams
}: PageProps) {
  const view = searchParams.view || 'table';

  const page = searchParams.page || 1;
  const page_size = searchParams.page_size || 10;
  const name = searchParams.name;

  const { data, status, message } = await getAllPayrolls({
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
        title="Payroll Managements"
        actions={<ModuleHRPayrollMenuAction />}
        search={<ModuleHRPayrollSearch />}
        filter={<ModuleHRPayrollFilter />}
        defaultView={view}
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
              ? <ModuleHRPayrollsKanbanView datas={data.items} />
              : <ModuleHRPayrollTableView datas={data.items} />
            }
          </Flex>
          <Pagination totalPages={data.total_page} />
        </Flex>
      )}
    </Flex>
  )
}
import { getAllSalaryStructures } from "@/app/actions/modules/hr/salary-structures";
import ModuleError from "@/components/modules/error";
import ModuleHRSalaryStructureMenuAction from "@/components/modules/hr/salary-structures/menu-action";
import ModuleHRSalaryStructureKanbanView from "@/components/modules/hr/salary-structures/view-kanban";
import ModuleHRSalaryStructureTableView from "@/components/modules/hr/salary-structures/view-table";
import MainModuleHeader from "@/components/modules/main/header";
import Pagination from "@/components/pagination";
import { Flex } from "@chakra-ui/react";
import ModuleHRSalaryStructureSearch from "@/components/modules/hr/salary-structures/search";
import ModuleHRSalaryStructureFilter from "@/components/modules/hr/salary-structures/filter";

export const dynamic = "force-dynamic"

type View = "kanban" | "table"

interface PageProps {
  searchParams: {
    view: View;
    page: number;
    page_size: number;
    name?: string;
  }
}

export default async function ModuleHRSalaryStructureReadPage({
  searchParams
}: PageProps) {
  const view = searchParams.view || "table"
  const page = searchParams.page || 1
  const page_size = searchParams.page_size || 10
  const name = searchParams.name

  const { data, status, message } = await getAllSalaryStructures({
    page: page,
    page_size: page_size,
    name: name,
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
        title="Salary Structure Managements"
        actions={<ModuleHRSalaryStructureMenuAction />}
        search={<ModuleHRSalaryStructureSearch />}
        filter={<ModuleHRSalaryStructureFilter />}
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
              ? <ModuleHRSalaryStructureKanbanView datas={data.items} />
              : <ModuleHRSalaryStructureTableView datas={data.items} />
            }
          </Flex>
          <Pagination totalPages={data.total_page as number} />
        </Flex>
      )}
    </Flex>
  )
}
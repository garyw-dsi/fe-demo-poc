import { getAllCustomers } from "@/app/actions/modules/crm/customers";
import ModuleCRMCustomersFilter from "@/components/modules/crm/customers/filter";
import ModuleCRMCustomersMenuAction from "@/components/modules/crm/customers/menu-action";
import ModuleCRMCustomersSearch from "@/components/modules/crm/customers/search";
import ModuleCRMCustomersKanbanView from "@/components/modules/crm/customers/view-kanban";
import ModuleCRMCustomersTableView from "@/components/modules/crm/customers/view-table";
import ModuleError from "@/components/modules/error";
import MainModuleHeader from "@/components/modules/main/header";
import Pagination from "@/components/pagination";
import { components } from "@/libs/api/schema/core-services";
import { Flex } from "@chakra-ui/react";

export const dynamic = "force-dynamic";

type View = "kanban" | "table";

interface PageProps {
  searchParams: {
    view?: View;
    page?: number;
    page_size?: number;
    name?: string;
    legal_type?: components['schemas']['ContactLegalType'];
  }
}

export default async function ModuleCRMCustomersPage({
  searchParams
}: PageProps) {
  const view = searchParams.view || "kanban";
  const page = searchParams.page || 1;
  const page_size = searchParams.page_size || 10;
  const name = searchParams.name || undefined;
  const legal_type = searchParams.legal_type || undefined;

  const { status, message, data } = await getAllCustomers({
    page: page,
    page_size: page_size,
    name: name,
    legal_types: legal_type
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
        title="Customers Managements"
        actions={<ModuleCRMCustomersMenuAction />}
        search={<ModuleCRMCustomersSearch />}
        filter={<ModuleCRMCustomersFilter />}
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
                ? <ModuleCRMCustomersKanbanView datas={data.items} />
                : <ModuleCRMCustomersTableView datas={data.items} />
              }
            </Flex>
            <Pagination totalPages={data?.total_page as number} />
          </Flex>
        ) : (
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
      }
    </Flex>
  )
}
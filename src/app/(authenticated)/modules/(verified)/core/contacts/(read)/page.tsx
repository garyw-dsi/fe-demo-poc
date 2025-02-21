import { getAllContacts } from "@/app/actions/modules/core/contacts"
import { components } from "@/libs/api/schema/core-services";
import ModuleError from "@/components/modules/error";
import { Flex } from "@chakra-ui/react";
import MainModuleHeader from "@/components/modules/main/header";
import ModuleContactsKanbanView from "@/components/modules/core/contacts/view-kanban";
import Pagination from "@/components/pagination";
import ModuleContactsMenuAction from "@/components/modules/core/contacts/menu-action";
import ModuleContactsTableView from "@/components/modules/core/contacts/view-table";
import ModuleContactsSearch from "@/components/modules/core/contacts/search";
import ModuleContactsFilter from "@/components/modules/core/contacts/filter";

export const dynamic = "force-dynamic";

type View = "kanban" | "table";

interface PageProps {
  searchParams: {
    view?: View;
    page?: number;
    page_size?: number;
    name?: string;
    legal_type?: components['schemas']['ContactLegalType'];
    archived?: boolean;
  }
}

export default async function ModuleContactReadPage({
  searchParams
}: PageProps) {
  const view = searchParams.view || "kanban";

  const page = searchParams.page || 1;
  const page_size = searchParams.page_size || 10;
  const name = searchParams.name || undefined;
  const legal_type = searchParams.legal_type || undefined;
  const archived = searchParams.archived || true;

  const { data, status, message } = await getAllContacts({
    page: page,
    page_size: page_size,
    name: name,
    legal_type: legal_type,
    parent_id: undefined,
    archived: archived
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
        title="Contact Managements"
        actions={<ModuleContactsMenuAction />}
        search={<ModuleContactsSearch />}
        filter={<ModuleContactsFilter />}
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
                ? <ModuleContactsKanbanView datas={data.items} />
                : <ModuleContactsTableView datas={data.items} />
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
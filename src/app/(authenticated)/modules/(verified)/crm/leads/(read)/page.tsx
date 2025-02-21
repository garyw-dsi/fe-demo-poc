import { Flex } from "@chakra-ui/react";
import { getAllLeads } from "@/app/actions/modules/crm/leads";
import { components } from "@/libs/api/schema/crm";
import { components as coreComponents } from "@/libs/api/schema/core-services";

import ModuleCRMLeadsMenuAction from "@/components/modules/crm/leads/menu-action";
import ModuleCRMLeadsKanbanView from "@/components/modules/crm/leads/view-kanban";
import ModuleCRMLeadsTableView from "@/components/modules/crm/leads/view-table";
import ModuleError from "@/components/modules/error";
import MainModuleHeader from "@/components/modules/main/header";
import Pagination from "@/components/pagination";
import ModuleCRMLeadsSearch from "@/components/modules/crm/leads/search";
import ModuleCRMLeadsFilter from "@/components/modules/crm/leads/filter";

export const dynamic = 'force-dynamic';

type View = "list" | "kanban";

interface PageProps {
  searchParams: {
    view?: View;
    page?: number;
    page_size?: number;
    name?: string;
    lead_source?: components['schemas']['LeadSource'];
    lead_status?: components['schemas']['LeadStatus'];
    lead_industry?: coreComponents['schemas']['IndustryType'];
    tag_id?: string;
  }
}

export default async function ModuleCRMLeadReadPage({
  searchParams
}: PageProps) {
  const view = searchParams.view || "kanban";
  const page = Number(searchParams.page) || 1;
  const page_size = Number(searchParams.page_size) || 10;

  const name = searchParams.name || undefined;
  const lead_source = searchParams.lead_source || undefined;
  const lead_status = searchParams.lead_status || undefined;
  const industry_type = searchParams.lead_industry || undefined;
  const tag_id = searchParams.tag_id ? parseInt(searchParams.tag_id) : undefined;

  const { data, message, status } = await getAllLeads({
    page: page,
    page_size: page_size,
    name: name,
    lead_source: lead_source,
    lead_status: lead_status,
    industry_type: industry_type,
    tag_id: tag_id,
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
        title="Leads"
        actions={<ModuleCRMLeadsMenuAction />}
        filter={<ModuleCRMLeadsFilter />}
        search={<ModuleCRMLeadsSearch />}
      />

      {(data && data.items.length > 0)
        ? (
          <Flex
            w={'full'}
            direction={'column'}
            gap={5}
            flex={1}
            overflowX={'auto'}
            maxW={'full'}
          >
            <Flex
              flex={1}
              align={'start'}
              overflowX={'auto'}
              maxW={'full'}
            >
              {view === 'kanban'
                ? <ModuleCRMLeadsKanbanView datas={data.items} />
                : <ModuleCRMLeadsTableView datas={data.items} />
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
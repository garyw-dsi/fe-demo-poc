import { Flex } from "@chakra-ui/react";
import { getAllPipelines } from "@/app/actions/modules/crm/pipelines";
import { components } from "@/libs/api/schema/crm";

import ModuleCRMPipelinesMenuAction from "@/components/modules/crm/pipelines/menu-action";
import ModuleError from "@/components/modules/error";
import MainModuleHeader from "@/components/modules/main/header";
import Pagination from "@/components/pagination";
import ModuleCRMPipelinesDragNDrop from "@/components/modules/crm/pipelines/drag-n-drop";

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: {
    page?: number;
    page_size?: number;
    name?: string;
    lead_source?: components['schemas']['LeadSource'];
    lead_status?: components['schemas']['LeadStatus'];
  }
}

const NoData = () => (
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

export default async function ModuleCRMPipelinesPage({
  searchParams
}: PageProps) {
  const page = Number(searchParams.page) || 1;
  const page_size = Number(searchParams.page_size) || 10;

  const name = searchParams.name || undefined;
  const lead_source = searchParams.lead_source || undefined;
  const lead_status = searchParams.lead_status || undefined;

  const { data, message, status } = await getAllPipelines({
    page: page,
    page_size: page_size,
    name: name,
    lead_source: lead_source,
    lead_status: lead_status
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
        title="Pipelines"
        actions={<ModuleCRMPipelinesMenuAction />}
        withViewHelper={false}
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
              <ModuleCRMPipelinesDragNDrop datas={data.items} />
            </Flex>
            <Pagination totalPages={data?.total_page as number} />
          </Flex>
        )
        : <NoData />
      }
    </Flex>
  )
}
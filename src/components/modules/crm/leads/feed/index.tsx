import { getAllLeads } from "@/app/actions/modules/crm/leads"
import { Flex, Text } from "@chakra-ui/react";
import ModulesHomeApplicationFeedLayout from "@/components/modules/home/feed/layout";
import ModuleCRMLeadsFeedTableData from "./table-data";
import ModuleCRMLeadsFeedHeader from "./header";



export default async function ModuleCRMLeadsFeed() {
  const { data } = await getAllLeads({
    page: 1,
    page_size: 5
  });

  return (
    <ModulesHomeApplicationFeedLayout>
      <Flex direction={'column'} w={'full'} gap={5} h={'fit-content'}>
        <ModuleCRMLeadsFeedHeader />
        {(data && data.items.length === 0)
          ? (
            <Flex
              w={'full'}
              justify={'center'}
              align={'center'}
            >
              <Text>No Data Found</Text>
            </Flex>
          )
          : <ModuleCRMLeadsFeedTableData datas={data?.items} />
        }
      </Flex>
    </ModulesHomeApplicationFeedLayout>
  )
}
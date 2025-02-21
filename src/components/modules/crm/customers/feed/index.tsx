import { Flex, Text } from "@chakra-ui/react";
import ModulesHomeApplicationFeedLayout from "@/components/modules/home/feed/layout";
import ModuleCRMCustomersFeedTableData from "./table-data";
import ModuleCRMCustomersFeedHeader from "./header";
import { getAllCustomers } from "@/app/actions/modules/crm/customers";



export default async function ModuleCRMCustomersFeed() {
  const { data } = await getAllCustomers({
    page: 1,
    page_size: 5
  });

  return (
    <ModulesHomeApplicationFeedLayout>
      <Flex direction={'column'} w={'full'} gap={5} h={'fit-content'}>
        <ModuleCRMCustomersFeedHeader />
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
          : <ModuleCRMCustomersFeedTableData datas={data?.items} />
        }
      </Flex>
    </ModulesHomeApplicationFeedLayout>
  )
}
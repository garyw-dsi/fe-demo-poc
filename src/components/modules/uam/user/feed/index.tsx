import { Flex, Text } from "@chakra-ui/react";
import ModulesHomeApplicationFeedLayout from "@/components/modules/home/feed/layout";
import ModuleUAMUsersFeedTableData from "./table-data";
import ModuleUAMUsersFeedHeader from "./header";
import { getAllUsers } from "@/app/actions/modules/uam/users";



export default async function ModuleUAMUsersFeed() {
  const { data } = await getAllUsers({
    page: 1,
    page_size: 5
  });

  return (
    <ModulesHomeApplicationFeedLayout>
      <Flex direction={'column'} w={'full'} gap={5} h={'fit-content'}>
        <ModuleUAMUsersFeedHeader />
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
          : <ModuleUAMUsersFeedTableData datas={data?.items} />
        }
      </Flex>
    </ModulesHomeApplicationFeedLayout>
  )
}
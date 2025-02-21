import ChartsBar from "@/components/charts/bar";
import ModulesHomeApplicationFeedLayout from "@/components/modules/home/feed/layout";
import { Flex } from "@chakra-ui/react";
import ModuleCRMCustomersFeedStatsBarHeader from "./header";

const dummyData = [
  { name: "Company", value: 300 },
  { name: "Individual", value: 400 },
  { name: "Government", value: 200 },
  { name: "Organization", value: 300 },
  { name: "Cooperation", value: 100 },
];

export default function ModuleCRMCustomersFeedStatsBar() {
  return (
    <ModulesHomeApplicationFeedLayout minH={{ lg: '50vh' }}>
      <Flex direction={'column'} w={'full'} gap={5}>
        <ModuleCRMCustomersFeedStatsBarHeader />
        <ChartsBar
          data={dummyData}
          xAxisKey="name"
          yAxisKey="value"
        />
      </Flex>
    </ModulesHomeApplicationFeedLayout>
  )
}
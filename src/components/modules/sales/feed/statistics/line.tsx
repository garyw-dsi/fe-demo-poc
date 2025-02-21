import ModulesHomeApplicationFeedLayout from "@/components/modules/home/feed/layout";
import { Flex } from "@chakra-ui/react";
import ChartsLine from "@/components/charts/line";
import ModuleSalesFeedStatsLineHeader from "./header";

const dummyData = [
  { name: "Week 1", value: 1000000 },
  { name: "Week 2", value: 1200000 },
  { name: "Week 3", value: 950000 },
  { name: "Week 4", value: 1100000 },
  { name: "Week 5", value: 850000 },
  { name: "Week 6", value: 1300000 },
  { name: "Week 7", value: 900000 },
  { name: "Week 8", value: 1150000 },
];

export default function ModuleSalesFeedStatsLine() {
  return (
    <ModulesHomeApplicationFeedLayout minH={{ lg: '50vh' }}>
      <Flex direction={'column'} w={'full'} gap={5}>
        <ModuleSalesFeedStatsLineHeader />
        <ChartsLine
          data={dummyData}
          xAxisKey="name"
          yAxisKey="value"
        />
      </Flex>
    </ModulesHomeApplicationFeedLayout>
  )
}
import ModulesHomeApplicationFeedLayout from "@/components/modules/home/feed/layout";
import { Flex } from "@chakra-ui/react";
import ChartsDoughnut from "@/components/charts/doughnut";
import ModuleCRMLeadsFeedStatsDoughnutHeader from "./header";

const dummyData = [
  { name: "New", value: 1500 },
  { name: "Qualified", value: 800 },
  { name: "Negotiation", value: 400 },
  { name: "Won", value: 250 },
  { name: "Lost", value: 50 },
];


export default function ModuleCRMLeadsFeedStatsDoughnut() {
  return (
    <ModulesHomeApplicationFeedLayout minH={{ lg: '50vh' }}>
      <Flex direction={'column'} w={'full'} gap={5}>
        <ModuleCRMLeadsFeedStatsDoughnutHeader />
        <ChartsDoughnut data={dummyData} />
      </Flex>
    </ModulesHomeApplicationFeedLayout>
  )
}
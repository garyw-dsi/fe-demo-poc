import { SimpleGrid } from "@chakra-ui/react";
import ModuleCRMLeadsFeed from "@/components/modules/crm/leads/feed";
import ModuleCRMCustomersFeed from "@/components/modules/crm/customers/feed";
import ModuleUAMUsersFeed from "@/components/modules/uam/user/feed";
import ModulesHomeApplicationFeedTransition from "./transition";
import ModuleCRMCustomersFeedStatsBar from "../../crm/customers/feed/statistics/bar";
import ModuleSalesFeedStatsLine from "../../sales/feed/statistics/line";
import ModuleCRMLeadsFeedStatsDoughnut from "../../crm/leads/feed/statistics/doughnut";

export default function ModulesHomeApplicationFeed() {
  return (
    <ModulesHomeApplicationFeedTransition>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={{ base: 3, md: 5 }}
        w={'full'}
      >
        <ModuleCRMCustomersFeedStatsBar />
        <ModuleSalesFeedStatsLine />
        <ModuleCRMLeadsFeedStatsDoughnut />
        <ModuleUAMUsersFeed />
        <ModuleCRMCustomersFeed />
        <ModuleCRMLeadsFeed />
      </SimpleGrid>
    </ModulesHomeApplicationFeedTransition>
  )
}
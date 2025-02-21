import { ModuleLinks } from "@/constants/modules/links";
import { FaUsers } from "react-icons/fa";
import { TbPresentationAnalytics } from "react-icons/tb";
import { PiLineSegmentsFill } from "react-icons/pi";
import { CoreTagLinks } from "@/constants/modules/links/core/tags";
import { CoreCurrencyLinks } from "@/constants/modules/links/core/currency";

const modulePrefix = "/modules/crm";

export const CRMCustomerLinks = (modulePrefix: string): ModuleLinks => (
  {
    name: "Customers",
    route: `${modulePrefix}/customers`,
    submodule: "customer",
    activeRoute: [
      `${modulePrefix}/customers`,
      `${modulePrefix}/customers/detail/[pk]`,
      `${modulePrefix}/customers/edit/[pk]`,
      `${modulePrefix}/customers/create`
    ],
    icon: FaUsers
  }
)


export const CRMLinks: ModuleLinks[] = [
  { ...CRMCustomerLinks(modulePrefix) },
  {
    name: "Leads",
    route: `${modulePrefix}/leads`,
    submodule: "lead",
    activeRoute: [
      `${modulePrefix}/leads`,
      `${modulePrefix}/leads/detail/[pk]`,
      `${modulePrefix}/leads/edit/[pk]`,
      `${modulePrefix}/leads/create`
    ],
    icon: TbPresentationAnalytics
  },
  {
    name: "Pipelines",
    route: `${modulePrefix}/pipelines`,
    submodule: "lead",
    activeRoute: [
      `${modulePrefix}/pipelines`,
    ],
    icon: PiLineSegmentsFill
  },
  { ...CoreTagLinks(modulePrefix) },
  { ...CoreCurrencyLinks(modulePrefix) }
];
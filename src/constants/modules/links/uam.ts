import { ModuleLinks } from "@/constants/modules/links";
import { FaUsers } from "react-icons/fa";
import { RiOrganizationChart } from "react-icons/ri";
import { GrOrganization } from "react-icons/gr";

const modulePrefix = "/modules/uam";

export const UAMLinks: ModuleLinks[] = [
  {
    name: "Users",
    route: `${modulePrefix}/users`,
    submodule: "user",
    activeRoute: [
      `${modulePrefix}/users`,
      `${modulePrefix}/users/detail/[pk]`,
      `${modulePrefix}/users/edit/[pk]`,
      `${modulePrefix}/users/create`
    ],
    icon: FaUsers
  },
  {
    name: "Groups",
    route: `${modulePrefix}/groups`,
    submodule: "group",
    activeRoute: [
      `${modulePrefix}/groups`,
      `${modulePrefix}/groups/create`,
      `${modulePrefix}/groups/create/[pk]/permission`,
      `${modulePrefix}/groups/detail/[pk]`,
      `${modulePrefix}/groups/edit/[pk]`
    ],
    icon: RiOrganizationChart
  },
  {
    name: "Organization",
    route: `${modulePrefix}/organization`,
    submodule: "organization",
    activeRoute: [
      `${modulePrefix}/organization`,
      `${modulePrefix}/organization/edit`,
      `${modulePrefix}/organization/edit/maintain`,
    ],
    icon: GrOrganization
  }
];
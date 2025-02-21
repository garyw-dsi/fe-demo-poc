import { ModuleLinks } from "@/constants/modules/links";
import { LuContact2 } from "react-icons/lu";

export const CoreContactLinks = (modulePrefix: string): ModuleLinks => (
  {
    name: "Contacts",
    route: `${modulePrefix}/contacts`,
    submodule: "contact",
    activeRoute: [
      `${modulePrefix}/contacts`,
      `${modulePrefix}/contacts/detail/[pk]`,
      `${modulePrefix}/contacts/edit/[pk]`,
      `${modulePrefix}/contacts/create`
    ],
    icon: LuContact2
  }
)
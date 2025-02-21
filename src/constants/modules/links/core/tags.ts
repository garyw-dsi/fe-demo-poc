import { ModuleLinks } from "@/constants/modules/links";
import { FaHashtag } from "react-icons/fa";

export const CoreTagLinks = (modulePrefix: string): ModuleLinks => (
  {
    name: "Tags",
    route: `${modulePrefix}/tags`,
    submodule: null,
    activeRoute: [
      `${modulePrefix}/tags`,
      `${modulePrefix}/tags/detail/[pk]`,
      `${modulePrefix}/tags/edit/[pk]`,
      `${modulePrefix}/tags/create`
    ],
    icon: FaHashtag,
  }
)
import { GrMoney } from "react-icons/gr";
import { ModuleLinks } from "..";

export const CoreVatLinks = (modulePrefix: string): ModuleLinks => (
  {
    name: "VAT",
    route: `${modulePrefix}/vat`,
    submodule: null,
    activeRoute: [
      `${modulePrefix}/vat`,
      `${modulePrefix}/vat/detail/[pk]`,
      `${modulePrefix}/vat/edit/[pk]`,
      `${modulePrefix}/vat/create`
    ],
    icon: GrMoney,
  }
)
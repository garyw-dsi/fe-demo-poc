import { ModuleLinks } from "@/constants/modules/links";
import { HiMiniCurrencyDollar } from "react-icons/hi2";

export const CoreCurrencyLinks = (modulePrefix: string): ModuleLinks => (
  {
    name: "Currency",
    route: `${modulePrefix}/currency`,
    submodule: null,
    activeRoute: [
      `${modulePrefix}/currency`
    ],
    icon: HiMiniCurrencyDollar
  }
)
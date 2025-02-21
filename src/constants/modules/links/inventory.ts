import { ModuleLinks } from "@/constants/modules/links";
import { AiOutlineProduct } from "react-icons/ai";
import { TbFilterCode } from "react-icons/tb";

import { CoreTagLinks } from "@/constants/modules/links/core/tags";
import { CoreCurrencyLinks } from "@/constants/modules/links/core/currency";
import { CoreVatLinks } from "@/constants/modules/links/core/vat";

const modulePrefix = "/modules/inventory";

export const InventoryLinks: ModuleLinks[] = [
  {
    name: "Products",
    route: `${modulePrefix}/products`,
    submodule: "product",
    activeRoute: [
      `${modulePrefix}/products`,
      `${modulePrefix}/products/detail/[pk]`,
      `${modulePrefix}/products/edit/[pk]`,
      `${modulePrefix}/products/create`
    ],
    icon: AiOutlineProduct,
  },
  {
    name: "Products Category",
    route: `${modulePrefix}/products/category`,
    submodule: "product_category",
    activeRoute: [
      `${modulePrefix}/products/category`,
      `${modulePrefix}/products/category/detail/[pk]`,
      `${modulePrefix}/products/category/edit/[pk]`,
      `${modulePrefix}/products/category/create`
    ],
    icon: TbFilterCode,
  },
  { ...CoreTagLinks(modulePrefix) },
  { ...CoreCurrencyLinks(modulePrefix) },
  { ...CoreVatLinks(modulePrefix) },
];
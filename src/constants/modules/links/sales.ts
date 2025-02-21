import { ModuleLinks } from "@/constants/modules/links";
import { MdOutlineRequestQuote } from "react-icons/md";
import { GrDocumentTime } from "react-icons/gr";
import { PiInvoiceFill } from "react-icons/pi";

import { CoreTagLinks } from "@/constants/modules/links/core/tags";
import { CoreCurrencyLinks } from "@/constants/modules/links/core/currency";
import { CoreVatLinks } from "@/constants/modules/links/core/vat";

const modulePrefix = "/modules/sales";

export const SalesLinks: ModuleLinks[] = [
  {
    name: "Quotations",
    route: `${modulePrefix}/quotations`,
    submodule: "quotation",
    activeRoute: [
      `${modulePrefix}/quotations`,
      `${modulePrefix}/quotations/detail/[pk]`,
      `${modulePrefix}/quotations/edit/[pk]`,
      `${modulePrefix}/quotations/create`
    ],
    icon: MdOutlineRequestQuote 
  },
  {
    name: "Orders",
    route: `${modulePrefix}/orders`,
    submodule: "order",
    activeRoute: [
      `${modulePrefix}/orders`,
      `${modulePrefix}/orders/detail/[pk]`,
      `${modulePrefix}/orders/edit/[pk]`,
      `${modulePrefix}/orders/create`,
      `${modulePrefix}/orders/create/[pk]`
    ],
    icon: GrDocumentTime
  },
  {
    name: "Invoices",
    route: `${modulePrefix}/invoices`,
    submodule: "invoice",
    activeRoute: [
      `${modulePrefix}/invoices`,
      `${modulePrefix}/invoices/detail/[pk]`,
      `${modulePrefix}/invoices/edit/[pk]`,
      `${modulePrefix}/invoices/create`,
      `${modulePrefix}/invoices/create/[pk]`
    ],
    icon: PiInvoiceFill
  },
  { ...CoreTagLinks(modulePrefix) },
  { ...CoreCurrencyLinks(modulePrefix) },
  { ...CoreVatLinks(modulePrefix) }
];
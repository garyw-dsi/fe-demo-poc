import { ModuleLinks } from "@/constants/modules/links";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { GrDocumentTime } from "react-icons/gr";

import { CoreTagLinks } from "@/constants/modules/links/core/tags";
import { CoreCurrencyLinks } from "@/constants/modules/links/core/currency";
import { CoreVatLinks } from "@/constants/modules/links/core/vat";
import { PiInvoiceFill } from "react-icons/pi";

const modulePrefix = "/modules/purchase";

export const PurchaseLinks: ModuleLinks[] = [
  {
    name: "Vendors",
    route: `${modulePrefix}/vendors`,
    submodule: "vendor",
    activeRoute: [
      `${modulePrefix}/vendors`,
      `${modulePrefix}/vendors/detail/[pk]`,
      `${modulePrefix}/vendors/edit/[pk]`,
      `${modulePrefix}/vendors/create`
    ],
    icon: FaUsers
  },
  {
    name: "Requisitions",
    route: `${modulePrefix}/requisitions`,
    submodule: "purchase-requisition",
    activeRoute: [
      `${modulePrefix}/requisitions`,
      `${modulePrefix}/requisitions/detail/[pk]`,
      `${modulePrefix}/requisitions/edit/[pk]`,
      `${modulePrefix}/requisitions/create`
    ],
    icon: VscGitPullRequestGoToChanges
  },
  {
    name: "Quotations",
    route: `${modulePrefix}/quotations`,
    submodule: "purchase-quotation",
    activeRoute: [
      `${modulePrefix}/quotations`,
      `${modulePrefix}/quotations/detail/[pk]`,
      `${modulePrefix}/quotations/edit/[pk]`,
      `${modulePrefix}/quotations/create`,
      `${modulePrefix}/quotations/create/[pk]`
    ],
    icon: IoDocumentTextOutline
  },
  {
    name: "Orders",
    route: `${modulePrefix}/orders`,
    submodule: "purchase-order",
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
      submodule: "purchase-invoice",
      activeRoute: [
        `${modulePrefix}/invoices`,
        `${modulePrefix}/invoices/detail/[pk]`,
        `${modulePrefix}/invoices/edit/[pk]`,
        `${modulePrefix}/invoices/create`
      ],
      icon: PiInvoiceFill
    },
  { ...CoreTagLinks(modulePrefix) },
  { ...CoreCurrencyLinks(modulePrefix) },
  { ...CoreVatLinks(modulePrefix) },
];
import { ModuleLinks } from "@/constants/modules/links";
import { CoreTagLinks } from "@/constants/modules/links/core/tags";
import { CoreCurrencyLinks } from "@/constants/modules/links/core/currency";
import { MdOutlineAccountTree } from "react-icons/md";
import { CoreVatLinks } from "@/constants/modules/links/core/vat";
import { RiBankLine } from "react-icons/ri";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { IoDocumentOutline } from "react-icons/io5";
import { CRMCustomerLinks } from "./crm";
import { BsJournals } from "react-icons/bs";

const modulePrefix = "/modules/accounting";

export const AccountingLinks: ModuleLinks[] = [
  {
    name: "Accounts",
    route: `${modulePrefix}/accounts`,
    submodule: "account",
    activeRoute: [
      `${modulePrefix}/accounts`,
      `${modulePrefix}/accounts/detail/[pk]`,
      `${modulePrefix}/accounts/edit/[pk]`,
      `${modulePrefix}/accounts/create`
    ],
    icon: MdOutlineAccountTree
  },
  {
    name: "Banks",
    route: `${modulePrefix}/banks`,
    submodule: null,
    activeRoute: [
      `${modulePrefix}/banks`,
      `${modulePrefix}/banks/detail/[pk]`,
      `${modulePrefix}/banks/edit/[pk]`,
      `${modulePrefix}/banks/create`
    ],
    icon: RiBankLine
  },
  { ...CRMCustomerLinks(modulePrefix) },
  {
    name: "Vendors",
    route: `${modulePrefix}/vendors`,
    submodule: null,
    activeRoute: [
      `${modulePrefix}/vendors`,
      `${modulePrefix}/vendors/detail/[pk]`,
      `${modulePrefix}/vendors/edit/[pk]`,
      `${modulePrefix}/vendors/create`
    ],
    icon: FaUsersBetweenLines
  },
  {
    name: "Journal Entry",
    route: `${modulePrefix}/journals`,
    submodule: null,
    activeRoute: [
      `${modulePrefix}/journals`,
      `${modulePrefix}/journals/detail/[pk]`,
      `${modulePrefix}/journals/edit/[pk]`,
      `${modulePrefix}/journals/create`
    ],
    icon: BsJournals
  },
  {
    name: "Reporting",
    route: `${modulePrefix}/reporting`,
    submodule: null,
    activeRoute: [
      `${modulePrefix}/reporting`,
      `${modulePrefix}/reporting/detail/[pk]`,
      `${modulePrefix}/reporting/edit/[pk]`,
      `${modulePrefix}/reporting/create`
    ],
    icon: IoDocumentOutline
  },
  { ...CoreTagLinks(modulePrefix) },
  { ...CoreCurrencyLinks(modulePrefix) },
  { ...CoreVatLinks(modulePrefix) },
];
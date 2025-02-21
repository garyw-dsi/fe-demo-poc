import { ModuleLinks } from "@/constants/modules/links";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { CoreTagLinks } from "@/constants/modules/links/core/tags";
import { VscUngroupByRefType } from "react-icons/vsc";
import { MdGroup } from "react-icons/md";
import { GrMoney } from "react-icons/gr";

const modulePrefix = "/modules/hr";

export const HRLinks: ModuleLinks[] = [
  {
    name: "Employees",
    route: `${modulePrefix}/employees`,
    submodule: "employee",
    activeRoute: [
      `${modulePrefix}/employees`,
      `${modulePrefix}/employees/detail/[pk]`,
      `${modulePrefix}/employees/edit/[pk]`,
      `${modulePrefix}/employees/create`
    ],
    icon: MdGroup
  },
  {
    name: "Departments",
    route: `${modulePrefix}/departments`,
    submodule: "department",
    activeRoute: [
      `${modulePrefix}/departments`,
      `${modulePrefix}/departments/detail/[pk]`,
      `${modulePrefix}/departments/edit/[pk]`,
      `${modulePrefix}/departments/create`
    ],
    icon: VscUngroupByRefType
  },
  {
    name: "Salary Structure",
    route: `${modulePrefix}/salary-structures`,
    submodule: "salary-structure",
    activeRoute: [
      `${modulePrefix}/salary-structures`,
      `${modulePrefix}/salary-structures/detail/[pk]`,
      `${modulePrefix}/salary-structures/edit/[pk]`,
      `${modulePrefix}/salary-structures/create`
    ],
    icon: GrMoney
  },
  {
    name: "Payroll",
    route: `${modulePrefix}/payrolls`,
    submodule: "payroll", 
    activeRoute: [
      `${modulePrefix}/payrolls`,
      `${modulePrefix}/payrolls/detail/[pk]`,
      `${modulePrefix}/payrolls/edit/[pk]`,
      `${modulePrefix}/payrolls/create`
    ],
    icon: FaMoneyBillTransfer
  },
  { ...CoreTagLinks(modulePrefix) }
];
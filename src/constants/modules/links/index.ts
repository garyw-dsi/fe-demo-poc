import { type ModuleName } from "@/constants/modules";

import { UAMLinks } from "@/constants/modules/links/uam";
import { InventoryLinks } from "@/constants/modules/links/inventory";
import { CRMLinks } from "@/constants/modules/links/crm";
import { SalesLinks } from "@/constants/modules/links/sales";
import { CoreLinks } from "@/constants/modules/links/core";
import { PurchaseLinks } from "@/constants/modules/links/purchase";
import { AccountingLinks } from "@/constants/modules/links/accounting";
import { HRLinks } from "@/constants/modules/links/hr";

type SubModuleUAM = "user" | "group" | "organization";
type SubModuleInventory = "product" | "product_category";
type SubModuleCRM = "customer" | "lead";
type SubModuleSales = "invoice" | "quotation" | "order";
type SubModuleCore = "contact";
type SubModulePurchase = "vendor" | "purchase-order" | "purchase-quotation" | "purchase-requisition" | "purchase-invoice";
type SubModuleAccounting = "account" | "bank" | "accounting" | "reporting" | "journal";
type SubModuleHR = "employee" | "leave" | "attendance" | "payroll" | "department" | "salary-structure";

export type SubModule =
  SubModuleUAM |
  SubModuleInventory |
  SubModuleCRM |
  SubModuleSales |
  SubModuleCore |
  SubModulePurchase |
  SubModuleAccounting |
  SubModuleHR;

export interface ModuleLinks {
  /**
   * @param name
   * @type string
   * @description
   * name is the name of the module that will be displayed in the sidebar
   * 
   * @example
   * name: 'User Access Management'
   */
  name: string;

  /**
   * @param route
   * @type string
   * @description
   * route is the path of the module that will be displayed in the sidebar
   * it used for routing in the application
   */
  route: string;

  /**
   * @param activeRoute 
   * @type string[]
   * @description
   * activeRoute is an array of string that contains the route that will be displayed in the sidebar
   * if the current route is in the activeRoute, the sidebar will be active
   * it can be used for nested route
   * 
   * @example
   * activeRoute: '["/modules/uam/user", "/modules/uam/user/detail/[pk]"]'
   * activeRoute: '["/modules/uam/user"]'
   */
  activeRoute: string[];

  /**
   * @param submodule
   * @type SubModule | null
   * @description
   * If the module has a submodule, the submodule will be displayed in the sidebar
   * if the submodule is null, the module will displayed to all modules in the sidebar
   * it means if submodule is null, the module is integrated with all submodules
   * 
   * @example
   * submodule: 'user'
   * submodule: null
   */
  submodule: SubModule | null;

  /**
   * @param icon
   * @type React.ElementType
   * @description
   * icon is the icon that will be displayed in the sidebar
   * it used for the icon in the sidebar
   */
  icon: React.ElementType;
}

export const moduleLinks: Record<ModuleName, ModuleLinks[]> = {
  UAM: UAMLinks,
  Dashboard: [],
  CRM: CRMLinks,
  Accounting: AccountingLinks,
  Purchase: PurchaseLinks,
  Sales: SalesLinks,
  Expenses: [],
  Inventory: InventoryLinks,
  HR: HRLinks,
  Contacts: CoreLinks,
}
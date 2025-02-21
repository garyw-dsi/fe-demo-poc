import { components } from "@/libs/api/schema/uam";
import { 
  FcBullish, 
  FcBusinessContact, 
  FcConferenceCall, 
  FcDataSheet, 
  FcDebt, 
  FcDeployment, 
  FcDoughnutChart, 
  FcFlowChart, 
  FcNews, 
  FcTreeStructure 
} from "react-icons/fc";

export type ModuleName = 
  | "UAM"
  | "Dashboard"
  | "CRM"
  | "Accounting"
  | "Purchase"
  | "Sales"
  | "Expenses"
  | "Inventory"
  | "HR"
  | "Contacts";

export type Permission = components["schemas"]["Permission"]['app'];

export interface Module {
  name: ModuleName;
  icon: React.ElementType;
  permission: Permission;
  route: string;
}

export const UAMModule: Module = {
  name: "UAM",
  icon: FcTreeStructure,
  permission: "uam",
  route: "/modules/uam",
};

export const DashboardModule: Module = {
  name: "Dashboard",
  icon: FcDoughnutChart,
  permission: "dashboard",
  route: "/modules/dashboard",
};

export const CRMModule: Module = {
  name: "CRM",
  icon: FcConferenceCall,
  permission: "crm",
  route: "/modules/crm",
};

export const AccountingModule: Module = {
  name: "Accounting",
  icon: FcDataSheet,
  permission: "accounting",
  route: "/modules/accounting",
};

/**
 * TODO: enable the permission if the services already up
 * for now the permission is empty
 * as the services is not up yet
 */
export const PurchaseModule: Module = {
  name: "Purchase",
  icon: FcDeployment,
  // permission: "purchase",
  permission: "",
  route: "/modules/purchase",
};

export const SalesModule: Module = {
  name: "Sales",
  icon: FcBullish,
  permission: "sales",
  route: "/modules/sales",
};

export const ExpensesModule: Module = {
  name: "Expenses",
  icon: FcDebt,
  permission: "expenses",
  route: "/modules/expenses",
};

export const InventoryModule: Module = {
  name: "Inventory",
  icon: FcNews,
  permission: "inventory",
  route: "/modules/inventory",
};

/**
 * TODO: enable the permission if the services already up
 * for now the permission is empty
 */
export const HRModule: Module = {
  name: "HR",
  icon: FcFlowChart,
  permission: "",
  route: "/modules/hr",
};

export const ContactsModule: Module = {
  name: "Contacts",
  icon: FcBusinessContact,
  permission: "contact",
  route: "/modules/core/contacts",
};

export const moduleMap: Record<ModuleName, Module> = {
  UAM: UAMModule,
  Dashboard: DashboardModule,
  CRM: CRMModule,
  Accounting: AccountingModule,
  Purchase: PurchaseModule,
  Sales: SalesModule,
  Expenses: ExpensesModule,
  Inventory: InventoryModule,
  HR: HRModule,
  Contacts: ContactsModule,
};

export const modules: Module[] = Object.values(moduleMap);

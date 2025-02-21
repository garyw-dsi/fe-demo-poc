export const uamServices = process.env.UAM_SERVICES;
export const coreServices = process.env.CORE_SERVICES;
export const inventoryServices = process.env.INVENTORY_SERVICES;
export const crmServices = process.env.CRM_SERVICES;
export const accountingServices = process.env.ACCOUNTING_SERVICES;
export const salesServices = process.env.SALES_SERVICES;

export interface FormState {
  message: string;
  status: "idle" | "loading" | "success" | "error";
}
import { components } from "@/libs/api/schema/core-services";

export type VendorTransactionView = {
  pk: number;
  number: string;
  date: string;
  journal: "Sales" | "Purchase" | "Payment" | "Receipt" | "Bank";
  payment_method: "Cash" | "Bank Transfer" | "Credit Card" | "Manual";
  vendor: components['schemas']['Contact'];
  amount: number;
  amount_company_currency: number;
  status: "Drafted" | "Posted" | "Canceled";
  created_at: string;
  created_by: components['schemas']['Contact']['created_by'];
  last_modified_at: string;
  last_modified_by: components['schemas']['Contact']['last_modified_by'];
  currency: string;
};

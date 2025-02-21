import { components } from "@/libs/api/schema/core-services";

export interface OrderDetails {
  product_id: number;
  product_name: string;
  quantity: number;
  uom: "pcs" | "box" | "kg";
  unit_price: number;
  tax: number;
}

export interface JournalDetails {
  account_number: string;
  account_name: string;
  debit: number;
  credit: number;
}

export interface PaymentHistory {
  date: string;
  number: string;
  journal: "Sales" | "Purchase" | "Payment" | "Receipt" | "Bank";
  payment_method: "Cash" | "Bank Transfer" | "Credit Card" | "Manual";
  customer: string;
  amount: number;
  amount_company_currency: number;
  status: "Drafted" | "Posted" | "Canceled";
}

type ContactMin = components["schemas"]["ContactMin"];
interface Customer extends ContactMin {
  invoice_id: number;
}

export interface Invoice {
  pk: number;
  customer: Customer;
  sales_order_id: number;
  invoice_date: string;
  delivery_date: string;
  due_date:string;
  payment_terms: string;
  currency: string;
  order_details: OrderDetails[];
  journal_details: JournalDetails[];
  paymentHistory: PaymentHistory[];
  attachment: null | string;
  notes: null | string;
}

export interface SubLedger {
  pk: number;
  journal: "Sales" | "Purchase" | "Payment" | "Receipt" | "Bank";
  account_number: string;
  account_name: string;
  invoice_date: string;
  due_date: string;
  year: number;
  debit: number;
  credit: number;
  balance: number;
};

export type Bucket = {
  name: "Not Past Due" | "1-30 Days" | "31-60 Days" | "61-90 Days" | "More than 90 Days";
  amount: number | null;
};

export interface Aging {
  invoice_date: string; 
  invoice_number: string; 
  currency: string;
  amount_in_original_currency: number;
  amount_in_reporting_currency: number;
  payment_terms: string; 
  bucket: Bucket[];
};
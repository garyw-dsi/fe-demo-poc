import { components } from "@/libs/api/schema/sales";

export const quotationStatus: components['schemas']['Quotation']['status'][] = [
  "Draft",
  "Approved",
  "Cancelled",
  "Issued",
  "Completed",
]

export const orderStatus: components['schemas']['Order']['status'][] = [
  "Draft",
  "Approved",
  "Cancelled",
  "Issued",
  "Completed",
]

export const invoiceStatus: components['schemas']['Invoice']['status'][] = [
  "Draft",
  "Approved",
  "Cancelled",
  "Issued",
  "Paid",
  "Over Paid",
  "Partially Paid",
]

export type PaymentTerm = components['schemas']['TransactionPaymentTerm'];

export const paymentTerms: PaymentTerm[] = [
  "Cash on Delivery",
  "Due in N days",
  "End of Month",
  "Due N days after end of month",
  "Advance Payment",
  "Down Payment",
  "Staggered Payment"
];

type DeliveryTerm = components['schemas']['TransactionDeliveryTerm'];

export const deliveryTerms: DeliveryTerm[] = [
  "Ex Works",
  "Free Carrier",
  "Carried Paid To",
  "Carriage and Insurance Paid To",
  "Delivery at Place",
  "Delivery at Place Unloaded",
  "Delivery Duty Paid",
  "Free Alongside Ship",
  "Free on Board",
  "Cost and Freight"
];


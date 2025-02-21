import { components } from "@/libs/api/schema/sales";
import { ThemeTypings } from "@chakra-ui/react";

/**
 * @type {Status}
 */
type Status = components["schemas"]["Quotation"]["status"];

/**
 * @type {StatusInfo}
 */
interface StatusInfo {
  color: ThemeTypings["colorSchemes"]
  text: string;
}

/**
 * @param status 
 * @type {Status}
 * 
 * @description
 * This function will return the color and text based on the status.
 * 
 * @returns {StatusInfo}
 */
export const handleStatusInfo = (status: Status): StatusInfo => { 
  switch (status) { 
    case "Draft":
      return { color: "gray", text: "Draft" };
    case "Issued":
      return { color: "purple", text: "Issued" };
    case "Completed":
      return { color: "blue", text: "Sent" };
    case "Approved":
      return { color: "teal", text: "Approved" };
    case "Cancelled":
      return { color: "red", text: "Cancelled" };
  }
}

export const handleStatusInvoiceInfo = (status: components["schemas"]["Invoice"]["status"]) => { 
  switch (status) { 
    case "Draft":
      return { color: "gray", text: "Draft" };
    case "Issued":
      return { color: "purple", text: "Issued" };
    case "Paid":
      return { color: "green", text: "Paid" };
    case "Approved":
      return { color: "teal", text: "Approved" };
    case "Cancelled":
      return { color: "red", text: "Cancelled" };
    case "Over Paid":
      return { color: "blue", text: "Over Paid" };
    case "Partially Paid":
      return { color: "yellow", text: "Partially Paid" };
  }
}
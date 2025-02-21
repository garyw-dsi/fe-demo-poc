import { ThemeTypings } from "@chakra-ui/react";

/**
 * @type {Status}
 */
type Status = "Draft" | "Sent" | "Approved" | "Cancelled";

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
    case "Sent":
      return { color: "blue", text: "Sent" };
    case "Approved":
      return { color: "teal", text: "Approved" };
    case "Cancelled":
      return { color: "red", text: "Cancelled" };
  }
}
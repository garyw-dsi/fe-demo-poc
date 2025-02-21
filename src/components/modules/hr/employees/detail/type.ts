import { components } from "@/libs/api/schema/accounting"
import { components as coreComponents } from "@/libs/api/schema/core-services"

export type AccountingHR = {
  accounts: components['schemas']['AccountMin'];
  bank: {
    name: string;
    number: string;
  }[];
  salary: {
    currency: coreComponents['schemas']['Currency'];
    amount: number;
    type: "monthly" | "weekly";
    position: string;
  }
}
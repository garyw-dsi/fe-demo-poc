import { getContactIndustryById } from "./read";
import { setContactIndustry } from "./create";
import { updateContactIndustry } from "./edit";
import { deleteContactIndustry } from "./delete";
import { components } from "@/libs/api/schema/core-services";

export interface EditIndustry { 
  pk: number;
  type: components['schemas']['IndustryType']
}

export {
  getContactIndustryById,
  setContactIndustry,
  updateContactIndustry,
  deleteContactIndustry
} 
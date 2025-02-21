import { components } from "@/libs/api/schema/uam";

export interface LegalType {
  values: components["schemas"]["OrganizationLegalType"]
}

export const legalTypes: LegalType[] = [
  { values: "Individual" },
  { values: "Partnership" },
  { values: "Limited Partnership" },
  { values: "Limited Liability Partnership" },
  { values: "Limited Liability Company" },
  { values: "Public Limited Company" },
  { values: "Private Limited Company" },
  { values: "Corporation" },
  { values: "Nonprofit Organization" },
  { values: "Cooperative" },
  { values: "Trust" },
  { values: "Government Agency" }
];
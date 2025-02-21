import { components } from "@/libs/api/schema/core-services";
import { components as crmComponents } from "@/libs/api/schema/crm";

export interface AddressType {
  values: components["schemas"]["AddressType"]
}

export const addressTypes: AddressType[] = [
  { values: "Billing" },
  { values: "Shipping" },
  { values: "Main" },
  { values: "Other" }
];

export interface IndustryType {
  values: components['schemas']['IndustryType']
}

export const industryType: IndustryType[] = [
  { values: "Accommodation and Food Service Activities" },
  { values: "Activities of Extraterritorial Organizations" },
  { values: "Activities of Households as Employers" },
  { values: "Administrative and Support Services" },
  { values: "Agriculture, Forestry, and Fishing" },
  { values: "Arts, Entertainment, and Recreation" },
  { values: "Construction" },
  { values: "Education" },
  { values: "Financial and Insurance Activities" },
  { values: "Human Health and Social Work Activities" },
  { values: "Information and Communication" },
  { values: "Manufacturing" },
  { values: "Mining and Quarrying" },
  { values: "Other Service Activities" },
  { values: "Professional, Scientific, and Technical Services" },
  { values: "Public Administration and Defense" },
  { values: "Real Estate Activities" },
  { values: "Transportation and Storage" },
  { values: "Utilities (Electricity, Gas, and Water Supply)" },
  { values: "Water Supply, Waste Management, and Remediation" },
  { values: "Wholesale and Retail Trade" }
];

export interface CustomerLegalType {
  values: components["schemas"]["ContactLegalType"]
}

export const customerLegalTypes: CustomerLegalType[] = [
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

export const leadStatus: crmComponents['schemas']['LeadStatus'][] = [
  "New",
  "Contacted",
  "Qualified",
  "Quotation",
  "Negotiation",
  "Lost",
  "Won",
  "Discontinued",
];

export const leadSource: crmComponents['schemas']['LeadSource'][] = [
  "Website",
  "Social Media",
  "Email Campaign",
  "Referral",
  "Other"
];

export const leadIndustry: components['schemas']['IndustryType'][] = [
  "Accommodation and Food Service Activities",
  "Activities of Extraterritorial Organizations",
  "Activities of Households as Employers",
  "Administrative and Support Services",
  "Agriculture, Forestry, and Fishing",
  "Arts, Entertainment, and Recreation",
  "Construction",
  "Education",
  "Financial and Insurance Activities",
  "Human Health and Social Work Activities",
  "Information and Communication",
  "Manufacturing",
  "Mining and Quarrying",
  "Other Service Activities",
  "Professional, Scientific, and Technical Services",
  "Public Administration and Defense",
  "Real Estate Activities",
  "Transportation and Storage",
  "Utilities (Electricity, Gas, and Water Supply)",
  "Water Supply, Waste Management, and Remediation",
  "Wholesale and Retail Trade"
];

type LeadScoreTerms = crmComponents['schemas']['LeadScore'];

export const leadScoreTerms: LeadScoreTerms[] = [
  "Likely",
  "Very Likely",
  "Most Likely",
]

type LeadStatus = crmComponents['schemas']['LeadStatus'];

export const leadStatusFlow: Record<LeadStatus, LeadStatus[]> = {
  "New": ["New", "Contacted", "Qualified"],
  "Contacted": ["Contacted", "Qualified"],
  "Qualified": ["Qualified"],
  "Quotation": ["Quotation", "Negotiation", "Lost", "Discontinued"],
  "Negotiation": ["Negotiation", "Lost", "Discontinued"],
  "Lost": ["Lost"],
  "Won": ["Won"],
  "Discontinued": ["Discontinued"]
};

import { components } from "@/libs/api/schema/accounting"

type AccountType = components['schemas']['AccountType']

export const accountTypes: AccountType[] = [
  "Asset",
  "Equity",
  "Expense",
  "Liability",
  "Revenue"
];

interface AccountLevel { 
  type: AccountType;
  level: string[];
}

export const accountLevelTypes: AccountLevel[] = [
  {
    type: "Asset",
    level: [
      "Current Asset",
      "Non-Current Asset",
      "Bank and Cash",
      "Other Current Asset",
      "Account Receivable",
      "Inventory",
      "Fixed Assets",
      "Prepayments",
    ]
  },
  {
    type: "Equity",
    level: [
      "Equity",
      "Current Year Earnings",
    ]
  },
  {
    type: "Expense",
    level: [
      "Expense",
      "Cost of Revenue",
      "Other Expense",
      "Operating Expense",
    ]
  },
  {
    type: "Liability",
    level: [
      "Current Liability",
      "Account Payable",
      "Other Payable",
      "Tax Payable",
      "Acruals",
      "Advance from Customer",
    ]
  },
  {
    type: "Revenue",
    level: [
      "Revenue",
      "Other Revenue",
    ]
  }
]
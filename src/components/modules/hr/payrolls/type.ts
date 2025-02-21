type User = {
  pk: number;
  email: string;
  first_name: string;
  last_name: string;
  image: {
    url: string;
  };
};

export type PayrollBatchStatus = "Draft" | "Processed" | "Approved" | "Paid";

export type PayrollBatch = {
  name: string;
  period_start: string;
  period_end: string;
  status: PayrollBatchStatus;
  total_salary: number;
  total_employee: number;
  created_at: string;
  created_by: User;
  last_modified_at: string;
  last_modified_by: User;
};

export type Payroll = {
  pk: number;
  batches: PayrollBatch;
}

type Allowances = {
  housing: number;
  transport: number;
  meal: number;
  other: number;
};

type Deductions = {
  tax: number;
  pension: number;
  other: number;
};

type SalaryStructure = {
  pk: number;
  name: string;
  basic_salary: number;
  allowances: Allowances;
  deductions: Deductions;
  overtime_rate: number;
  salary_frequency: "Monthly" | "Weekly" | "Daily";
  tax_calculation: "Gross" | "Net";
};

type Employee = {
  pk: number;
  name: string;
  department: string;
  salary_structure: SalaryStructure;
  payment_status: "Pending" | "Paid" | "Failed";
  bank: {
    name: string;
    number: string;
  }
};

export type PayrollDetail = {
  pk: number;
  batches: PayrollBatch;
  employees: Employee[];
  created_at: string;
  created_by: User;
  last_modified_at: string;
  last_modified_by: User;
};


type User = {
  pk: number;
  email: string;
  first_name: string;
  last_name: string;
  image: {
    url: string;
  };
};

type Department = {
  pk: number;
  name: string;
};

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

export type SalaryStructure = {
  pk: number;
  name: string;
  code: string;
  description: string;
  department: Department;
  // employment_type: "Full Time" | "Part Time" | "Internship";
  employment_type: "Employee" | "Daily Worker";
  basic_salary: number;
  allowances: Allowances;
  deductions: Deductions;
  overtime_rate: number;
  salary_frequency: "Monthly" | "Weekly" | "Daily";
  tax_calculation: "Gross" | "Net";
  created_at: string;
  created_by: User;
  last_modified_at: string;
  last_modified_by: User;
};
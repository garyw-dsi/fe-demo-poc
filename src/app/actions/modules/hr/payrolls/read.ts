"use server"

import { Payroll, PayrollDetail } from "@/components/modules/hr/payrolls/type";
import { faker } from "@faker-js/faker";

export const getAllPayrolls = async({
  page, page_size
}: { 
  page: number;
  page_size: number;
  name?: string;
}) => {
  try {
    const data: Payroll[] = Array.from({ length: page_size }, (_, i) => { 
      return {
        pk: i + 1,
        batches: {
          name: `Payroll Batch ${faker.number.int({ min: 100, max: 999 })}`,
          period_start: faker.date.past().toISOString(),
          period_end: faker.date.future().toISOString(),
          status: faker.helpers.arrayElement([
            "Draft",
            "Processed",
            "Approved",
            "Paid",
          ]),
          total_salary: Number(faker.number.int({ min: 20000000, max: 100000000 })),
          total_employee: Number(faker.number.int({ min: 20, max: 100 })),
          created_at: faker.date.recent().toISOString(),
          created_by: {
            pk: faker.number.int({ min: 1, max: 1000 }),
            email: faker.internet.email(),
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            image: {
              url: faker.image.avatar()
            }
          },
          last_modified_at: faker.date.recent().toISOString(),
          last_modified_by: {
            pk: faker.number.int({ min: 1, max: 1000 }),
            email: faker.internet.email(),
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            image: {
              url: faker.image.avatar()
            }
          },
        }
      }
    });

    return {
      status: "success",
      message: "Successfully fetched payrolls",
      data: {
        total_items: data.length * page_size,
        total_page: 10,
        page: page,
        items: data
      }
    }

  } catch (error) {
    const message = error instanceof Error 
      ? error.message
      : "An error occured while fetching payrolls";
    
    return {
      status: "error",
      message
    }
  }
}

export const getPayroll = async ({ pk }: { pk: number }) => { 
  try {
    const salary_structure = {
      pk: faker.number.int({ min: 1, max: 1000 }),
      name: faker.person.jobTitle(),
      basic_salary: Number(faker.number.int({ min: 2000000, max: 10000000 })),
      allowances: {
        housing: Number(faker.number.int({ min: 1000000, max: 10000000 })),
        transport: Number(faker.number.int({ min: 1000000, max: 10000000 })),
        meal: Number(faker.number.int({ min: 1000000, max: 10000000 })),
        other: Number(faker.number.int({ min: 1000000, max: 10000000 }))
      },
      deductions: {
        tax: Number(faker.number.int({ min: 1000000, max: 10000000 })),
        pension: Number(faker.number.int({ min: 1000000, max: 10000000 })),
        other: Number(faker.number.int({ min: 1000000, max: 10000000 }))
      },
      overtime_rate: Number(faker.number.int({ min: 10000, max: 100000 })),
      salary_frequency: faker.helpers.arrayElement([
        "Monthly",
        "Weekly",
        "Daily"
      ]),
      tax_calculation: faker.helpers.arrayElement([
        "Gross",
        "Net"
      ]),
    }

    const totalAllowance = Object.values(salary_structure.allowances).reduce((acc, curr) => acc + curr, 0);
    const totalDeduction = Object.values(salary_structure.deductions).reduce((acc, curr) => acc + curr, 0);

    const totalSalary = salary_structure.basic_salary + totalAllowance - totalDeduction;
    const totalEmployee = Number(faker.number.int({ min: 20, max: 100 }));
    
    const batches = {
      name: `Payroll Batch ${faker.number.int({ min: 100, max: 999 })}`,
      period_start: faker.date.past().toISOString(),
      period_end: faker.date.future().toISOString(),
      status: faker.helpers.arrayElement([
        "Draft",
        "Processed",
        "Approved",
        "Paid"
      ]),
      total_salary: Number(totalSalary * totalEmployee),
      total_employee: totalEmployee,
      created_at: faker.date.recent().toISOString(),
      created_by: {
        pk: faker.number.int({ min: 1, max: 1000 }),
        email: faker.internet.email(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        image: {
          url: faker.image.avatar()
        }
      },
      last_modified_at: faker.date.recent().toISOString(),
      last_modified_by: {
        pk: faker.number.int({ min: 1, max: 1000 }),
        email: faker.internet.email(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        image: {
          url: faker.image.avatar()
        }
      },
    }

    const employees = Array.from({ length: batches.total_employee }, (_, i) => { 
      return {
        pk: i + 1,
        name: faker.person.fullName(),
        department: faker.person.jobTitle(),
        salary_structure: salary_structure,
        bank: {
          name: faker.helpers.arrayElement([
            "BNI", "BCA", "Mandiri", "BRI"
          ]),
          number: faker.finance.accountNumber()
        },
        payment_status: faker.helpers.arrayElement([
          "Pending",
          "Paid",
          "Failed"
        ]),
      }
    });

    const data: PayrollDetail = {
      pk: pk,
      batches: batches,
      employees: employees,
      created_at: faker.date.recent().toISOString(),
      created_by: {
        pk: faker.number.int({ min: 1, max: 1000 }),
        email: faker.internet.email(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        image: {
          url: faker.image.avatar()
        }
      },
      last_modified_at: faker.date.recent().toISOString(),
      last_modified_by: {
        pk: faker.number.int({ min: 1, max: 1000 }),
        email: faker.internet.email(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        image: {
          url: faker.image.avatar()
        }
      },
    }

    return {
      status: "success",
      message: "Successfully fetched payroll",
      data
    }
  } catch (error) {
    const message = error instanceof Error 
      ? error.message
      : "An error occured while fetching payroll";
    
    return {
      status: "error",
      message
    }
  }
}
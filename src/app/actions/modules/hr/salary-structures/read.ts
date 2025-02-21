"use server"

import { SalaryStructure } from "@/components/modules/hr/salary-structures/type";
import {  faker } from "@faker-js/faker";

type Pagination = {
  total_items: number;
  total_page: number;
  page: number;
  items: SalaryStructure[];
};

export const getAllSalaryStructures = async({
  page, page_size
}: {
  page: number;
  page_size: number;
  name?: string;
}) => {
  try {
    const data = Array.from({ length: page_size }).map((_, index) => {
      return {
        pk: index,
        name: faker.person.jobTitle(),
        code: `SLRY-STRCT-${faker.number.int({ min: 1000, max: 9999 })}`,
        description: faker.lorem.sentence(),
        department: {
          pk: faker.number.int({ min: 1, max: 999 }),
          name: faker.person.jobTitle()
        },
        employment_type: faker.helpers.arrayElement([
          "Employee",
          "Daily Worker",
        ]),
        basic_salary: Number(faker.number.int({ min: 1000000, max: 100000000 })),
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
        overtime_rate: Number(faker.number.int({ min: 10000, max: 100000})),
        salary_frequency: faker.helpers.arrayElement([
          "Monthly", 
          "Weekly", 
          "Daily", 
        ]),
        tax_calculation: faker.helpers.arrayElement([
          "Gross",
          "Net"
        ]),
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
        }
      }
    });

    const paginatedData: Pagination = {
      total_items: data.length * page_size,
      total_page: 10,
      page: page,
      items: data
    }

    return {
      status: "success",
      message: "Successfully fetched salary structures",
      data: paginatedData
    }
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "An error occured while fetching salary structures";
    
    return {
      status: "error",
      message,
    }
  }
}

export const getSalaryStructure = async ({ pk }: { pk: number }) => {
  try {
    const data: SalaryStructure = {
      pk: pk,
      name: faker.person.jobTitle(),
      code: `SLRY-STRCT-${faker.number.int({ min: 1000, max: 9999 })}`,
      description: faker.lorem.sentence(),
      department: {
        pk: faker.number.int({ min: 1, max: 999 }),
        name: faker.person.jobTitle()
      },
      employment_type: faker.helpers.arrayElement([
        "Employee",
        "Daily Worker",
      ]),
      basic_salary: Number(faker.number.int({ min: 1000000, max: 100000000 })),
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
      }
    }
    
    return {
      status: "success",
      message: "Successfully fetched salary structure",
      data
    }
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "An error occured while fetching salary structure";

    return {
      status: "error",
      message
    }
  }
}

export const getSalaryStructureOptions = async ({ name }: { name: string }) => {
  try {
    console.log(`Fetching salary structure options... ${name}`);
    const data: SalaryStructure[] = Array.from({ length: 10 }).map((_, index) => {
      return {
        pk: index,
        name: faker.person.jobTitle(),
        code: `SLRY-STRCT-${faker.number.int({ min: 1000, max: 9999 })}`,
        description: faker.lorem.sentence(),
        department: {
          pk: faker.number.int({ min: 1, max: 999 }),
          name: faker.person.jobTitle()
        },
        employment_type: faker.helpers.arrayElement([
          "Employee",
          "Daily Worker",
        ]),
        basic_salary: Number(faker.number.int({ min: 1000000, max: 100000000 })),
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
        overtime_rate: Number(faker.number.int({ min: 10000, max: 100000})),
        salary_frequency: faker.helpers.arrayElement([
          "Monthly",
          "Weekly",
          "Daily"
        ]),
        tax_calculation: faker.helpers.arrayElement([
          "Gross",
          "Net"
        ]),
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
        }
      }
    })
      
    return {
      status: "success",
      message: "Successfully fetched salary structure options",
      data
    }
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "An error occured while fetching salary structure options";
    
    return {
      status: "error",
      message
    }
  }
}
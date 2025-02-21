"use server"

import { legalTypes } from "@/constants/modules/organization";
import { components } from "@/libs/api/schema/uam"
import { components as coreComponents } from "@/libs/api/schema/core-services"
import { components as accountingComponents } from "@/libs/api/schema/accounting"
import { faker } from "@faker-js/faker";
import { accountTypes } from "@/constants/modules/accounting/accounts";

type Employees = components['schemas']['PaginatedUser'];
type Employee = components['schemas']['User'];

export const getAllEmployees = async ({
  page,
  page_size
}: {
  page: number
  page_size: number
  name?: string
}) => {
  try {
    const data: Employee[] = Array.from({ length: page_size }).map((_, i) => {
      return {
        pk: i + 1,
        email: faker.internet.email(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        group: {
          name: faker.commerce.department(),
          organization: {
            pk: faker.number.int({ min: 1, max: 1000 }),
            image: {
              url: faker.image.url()
            },
            legal_name: faker.company.name(),
            legal_type: faker.helpers.arrayElement(legalTypes.map((type) => type.values)),
          },
          pk: faker.number.int({ min: 1, max: 1000 }),
        },
        image: {
          url: faker.image.avatar()
        },
        employment_status: faker.helpers.arrayElement([
          "New", 
          "Running", 
          "Terminated", 
          "Extended",
        ]),
        is_active: faker.helpers.arrayElement([true, false]),
        is_locked: faker.helpers.arrayElement([true, false]),
        is_superuser: faker.helpers.arrayElement([true, false]),
        is_verified: faker.helpers.arrayElement([true, false]),
        last_login_at: faker.date.recent().toISOString(),
        need_change_password: false,
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

    const paginatedData: Employees = {
      items: data,
      page: page,
      total_items: data.length * page_size,
      total_page: 10,
    }

    return {
      status: "success",
      message: "Successfully fetched employees",
      data: paginatedData
    }

  } catch (error) {
    const message = error instanceof Error 
      ? error.message
      : "An error occured while fetching employees";
    
    return {
      status: "error",
      message,
    }
  }
}

type Accounting = {
  accounts: accountingComponents['schemas']['AccountMin'];
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

export const getEmployee = async ({ pk }: { pk: number }) => { 
  try {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const image = faker.image.avatar();
    const legal = faker.helpers.arrayElement(legalTypes.map((type) => type.values));

    const data: Employee = {
      pk: pk,
      email: faker.internet.email(),
      first_name: firstName,
      last_name: lastName,
      group: {
        name: faker.commerce.department(),
        organization: {
          pk: faker.number.int({ min: 1, max: 1000 }),
          image: {
            url: image
          },
          legal_name: faker.company.name(),
          legal_type: legal
        },
        pk: faker.number.int({ min: 1, max: 1000 }),
      },
      image: {
        url: faker.image.avatar()
      },
      employment_status: faker.helpers.arrayElement([
        "New", 
        "Running", 
        "Terminated", 
        "Extended",
      ]),
      is_active: faker.helpers.arrayElement([true, false]),
      is_locked: faker.helpers.arrayElement([true, false]),
      is_superuser: faker.helpers.arrayElement([true, false]),
      is_verified: faker.helpers.arrayElement([true, false]),
      last_login_at: faker.date.recent().toISOString(),
      need_change_password: false,
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

    const contact: coreComponents['schemas']['ContactMin'] = {
      pk: faker.number.int({ min: 1, max: 1000 }),
      name: `${firstName} ${lastName}`,
      image: {url: image},
      legal_type: legal,
      parent: null
    }

    const accounting: Accounting = {
      accounts: {
        account_number: faker.finance.accountNumber(),
        account_type: faker.helpers.arrayElement(accountTypes),
        name: faker.finance.accountName(),
        number: faker.finance.accountNumber(),
        pk: faker.number.int({ min: 1, max: 1000 }),
      },
      bank: Array.from({ length: 5 }, () => ({
        name: faker.helpers.arrayElement(['BCA', 'BNI', 'Mandiri', 'BRI', 'CIMB Niaga']),
        number: faker.finance.accountNumber(),
      })),
      salary: {
        currency: {
          pk: 1,
          country: {
            iso_a2: "ID",
            iso_a3: "IDN",
            iso_n: 360,
            name: "Republic of Indonesia",
            pk: 1,
          },
          iso: "IDR",
          name: "Indonesian Rupiah",
          symbol: "Rp",
        },
        amount: Number(faker.number.int({ min: 3000000, max: 20000000 })),
        type: faker.helpers.arrayElement(["monthly", "weekly"]),
        position: faker.person.jobTitle()
      }
    }

    return {
      status: "success",
      message: "Successfully fetched employee",
      data: {
        employee: data,
        contact: contact,
        accounting: accounting,
      }
    }
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "An error occured while fetching employee";
    
    return {
      status: "error",
      message
    }
  }
}




export const getEmployeeOptions = async ({ employeeName }: { employeeName: string }) => {
  try {
    const data = {
      name: faker.person.fullName(),
    }
    console.log(employeeName);

    return {
      status: "success",
      message: "Successfully fetched employee options",
      data: data
    }

  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to fetch order options";
    
    return {
      status: "error",
      message
    }
  }
};
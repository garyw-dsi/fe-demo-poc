"use server"

import { legalTypes } from "@/constants/modules/organization"
import { FormState } from "@/libs/api/constants"
import { components } from "@/libs/api/schema/crm"
import { components as coreComponents } from "@/libs/api/schema/core-services"
import { faker } from "@faker-js/faker"
import { industryType } from "@/constants/modules/crm"

type Vendor = components['schemas']['Customer']

interface GetAllVendor
  extends FormState {
    data?: components['schemas']['PaginatedCustomer']
}

export const getAllVendor = async ({
  page = 1,
  page_size = 10
}: {
  page?: number,
  page_size?: number
}): Promise<GetAllVendor> => {
  try {
    const datas: Vendor[] = Array.from({ length: page_size }).map((_, index) => {
      return {
        pk: index + 1,
        contact: {
          name: faker.person.fullName(),
          legal_type: faker.helpers.arrayElement(legalTypes.map(val => val.values)),
          image: {
            url: faker.image.url()
          },
          parent: null,
          pk: faker.number.int()
        },
        created_at: faker.date.recent().toISOString(),
        created_by: {
          email: faker.internet.email(),
          first_name: faker.person.firstName(),
          last_name: faker.person.lastName(),
          pk: faker.number.int(),
          image: {
            url: faker.image.url()
          }
        },
        last_modified_at: faker.date.recent().toISOString(),
        last_modified_by: {
          email: faker.internet.email(),
          first_name: faker.person.firstName(),
          last_name: faker.person.lastName(),
          pk: faker.number.int(),
          image: {
            url: faker.image.url()
          }
        },
      }
    });

    return {
      status: "success",
      message: "Success get all vendor",
      data: {
        items: datas,
        total_items: 100,
        total_page: 10,
        page: page,
      }
    }
  } catch  {
    return {
      status: "error",
      message: "Failed get all vendor",
    }
  }
}

interface GetVendor
  extends FormState {
  data?: {
    vendor: Vendor;
    contact: coreComponents['schemas']['Contact'];
    address: coreComponents['schemas']['Address'][];
    industry: coreComponents['schemas']['Industry'][];
  }
}

export const getVendor = async ({
  pk
}: {
  pk: number
}): Promise<GetVendor> => {
  try {
    const contactMin: coreComponents['schemas']['ContactMin'] = {
      pk: faker.number.int(),
      name: faker.person.fullName(),
      legal_type: faker.helpers.arrayElement(legalTypes.map(val => val.values)),
      image: {
        url: faker.image.url()
      },
      parent: null,
    }
    
    const vendor: Vendor = {
      pk: pk,
      contact: contactMin,
      created_at: faker.date.recent().toISOString(),
      created_by: {
        email: faker.internet.email(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        pk: faker.number.int(),
        image: {
          url: faker.image.url()
        }
      },
      last_modified_at: faker.date.recent().toISOString(),
      last_modified_by: {
        email: faker.internet.email(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        pk: faker.number.int(),
        image: {
          url: faker.image.url()
        }
      }
    };    

    const contact: coreComponents['schemas']['Contact'] = {
      ...contactMin,
      created_at: faker.date.recent().toISOString(),
      created_by: {
        email: faker.internet.email(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        pk: faker.number.int(),
        image: {
          url: faker.image.url()
        }
      },
      deleted_at: null,
      last_modified_at: faker.date.recent().toISOString(),
      last_modified_by: {
        email: faker.internet.email(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        pk: faker.number.int(),
        image: {
          url: faker.image.url()
        }
      },
      tax_id: faker.commerce.isbn(),
      tags: faker.helpers.arrayElements([{ pk: 1, name: "tag 1" }, { pk: 2, name: "tag 2" }, { pk:3, name: "tag 3" }]),
    };

    const addressTypes = ["Billing", "Shipping", "Main", "Other"].slice(0, faker.number.int({ min: 1, max: 4 })); 
    const shuffledTypes = faker.helpers.shuffle(addressTypes);

    const address: coreComponents["schemas"]["Address"][] = Array.from({ length: shuffledTypes.length }).map((_, index) => ({
      address: faker.location.streetAddress(),
      address_type: shuffledTypes[index] as coreComponents["schemas"]["AddressType"],
      contact: contactMin,
      created_at: faker.date.recent().toISOString(),
      created_by: {
        email: faker.internet.email(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        pk: faker.number.int(),
        image: {
          url: faker.image.url()
        }
      },
      email: faker.internet.email(),
      last_modified_at: faker.date.recent().toISOString(),
      last_modified_by: {
        email: faker.internet.email(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        pk: faker.number.int(),
        image: {
          url: faker.image.url()
        }
      },
      name: faker.person.fullName(),
      phone: faker.phone.number({
        style: "national",
      }),
      pk: faker.number.int(),
    }));

    const industry: coreComponents['schemas']['Industry'][] = Array.from({ length: 3 }).map(() => ({
      pk: faker.number.int(),
      industry_type: faker.helpers.arrayElement(industryType.map(val => val.values)),
      contact: contactMin,
      created_at: faker.date.recent().toISOString(),
      created_by: {
        email: faker.internet.email(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        pk: faker.number.int(),
        image: {
          url: faker.image.url()
        }
      },
      last_modified_at: faker.date.recent().toISOString(),
      last_modified_by: {
        email: faker.internet.email(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        pk: faker.number.int(),
        image: {
          url: faker.image.url()
        }
      }
    }));

    return {
      status: "success",
      message: "Fetched vendor successfully",
      data: {
        vendor: vendor,
        contact: contact,
        address: address,
        industry: industry
      }
    }

  } catch {
    return {
      status: "error",
      message: "Failed to fetch vendor",
    }
  }
}
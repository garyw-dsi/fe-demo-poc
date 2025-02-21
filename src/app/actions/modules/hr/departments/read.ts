"use server"

import { legalTypes } from "@/constants/modules/organization";
import { components } from "@/libs/api/schema/uam";
import { faker } from "@faker-js/faker";

type Department = components['schemas']['Group']
type Departments = components['schemas']['PaginatedGroup']

export const getAllDepartments = async ({
  page,
  page_size
}: {
  page: number;
  page_size: number;
  name?: string;
  }) => { 
  try {
    const departments: Department[] = Array.from({ length: page_size }, (_, i) => ({
      pk: i + 1,
      created_at: faker.date.recent().toISOString(),
      created_by: {
        pk: 1,
        email: faker.internet.email(),
        first_name: faker.person.firstName(),
        image: { url: faker.image.avatar() },
        last_name: faker.person.lastName(),
      },
      last_modified_at: faker.date.recent().toISOString(),
      last_modified_by: {
        pk: 1,
        email: faker.internet.email(),
        first_name: faker.person.firstName(),
        image: { url: faker.image.avatar() },
        last_name: faker.person.lastName(),
      },
      name: faker.person.jobTitle(),
      organization: {
        pk: 1,
        image: { url: faker.image.avatar() },
        legal_name: faker.company.name(),
        legal_type: faker.helpers.arrayElement(legalTypes.map((type) => type.values)),
      }
    }));

    const data: Departments = {
      items: departments,
      page: page,
      total_page: departments.length * 10,
      total_items: departments.length
    };

    return {
      status: "success",
      message: "Departments fetched successfully",
      data: data
    }
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "An error occurred while fetching departments";
    
    return {
      status: "error",
      message
    }
  }
}

export const getDepartment = async ({ pk }: { pk: number }) => {
  try {
    const department: Department = {
      pk: pk,
      created_at: faker.date.recent().toISOString(),
      created_by: {
        pk: 1,
        email: faker.internet.email(),
        first_name: faker.person.firstName(),
        image: { url: faker.image.avatar() },
        last_name: faker.person.lastName(),
      },
      last_modified_at: faker.date.recent().toISOString(),
      last_modified_by: {
        pk: 1,
        email: faker.internet.email(),
        first_name: faker.person.firstName(),
        image: { url: faker.image.avatar() },
        last_name: faker.person.lastName(),
      },
      name: faker.person.jobTitle(),
      organization: {
        pk: 1,
        image: { url: faker.image.avatar() },
        legal_name: faker.company.name(),
        legal_type: faker.helpers.arrayElement(legalTypes.map((type) => type.values)),
      }
    }

    return {
      status: "success",
      message: "Department fetched successfully",
      data: department
    }
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "An error occurred while fetching department";
    
    return {
      status: "error",
      message
    }
  }
}
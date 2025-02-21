"use server"

import { faker } from "@faker-js/faker";

export const getAllBanks = async ({
  page,
  page_size
}: {
  page: number;
  page_size: number;
}) => {
  try {
    const dummyData = Array.from({ length: page_size }, (_, i) => ({
      pk: i + 1,
      number: faker.finance.accountNumber(),
      name: faker.helpers.arrayElement(["BCA", "BRI", "Mandiri", "BNI", "CIMB Niaga", "Danamon", "Permata", "Panin", "Maybank", "OCBC NISP"]),
      identifier_code: faker.finance.accountName(),
    }));

    return { 
      status: "success",
      message: "Successfully get all banks",
      data: {
        items: dummyData,
        page: page,
        page_size: page_size,
        total_page: dummyData.length 
      }
    }
  } catch {
    return {
      status: "error",
      message: "Failed to get all banks"
    }
  }
}

export const getBank = async ({ pk }: { pk: number }) => { 
  try {
    const data = {
      pk: pk,
      number: faker.finance.accountNumber(),
      name: faker.helpers.arrayElement(["BCA", "BRI", "Mandiri", "BNI", "CIMB Niaga", "Danamon", "Permata", "Panin", "Maybank", "OCBC NISP"]),
      identifier_code: faker.finance.accountName(),
      last_modified_at: faker.date.recent().toISOString(),
      last_modified_by: {
        pk: faker.number.int({ min: 1, max: 100 }),
        image: { url: faker.image.avatar() },
        email: faker.internet.email(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
      },
      created_at: faker.date.recent().toISOString(),
      created_by: {
        pk: faker.number.int({ min: 1, max: 100 }),
        image: { url: faker.image.avatar() },
        email: faker.internet.email(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
      },
    };

    return {
      status: "success",
      message: "Successfully get bank",
      data
    }
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to get bank";
    
    return {
      status: "error",
      message
    }
    
  }
}
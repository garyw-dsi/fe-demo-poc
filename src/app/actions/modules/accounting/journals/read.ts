"use server"

import { faker } from "@faker-js/faker";

interface Journal {
  page: number;
  page_size: number;
}

export const getAllJournals = async ({ page, page_size }: Journal) => {
  try {
    const data = Array.from({ length: page_size }, () => {
      const journalItems = Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
        number: faker.finance.accountNumber(),
        name: faker.finance.accountName(),
        debit: Number(faker.finance.amount({ min: 100000, max: 1000000 })),
        credit: Number(faker.finance.amount({ min: 100000, max: 1000000 })),
      }));

      return {
        pk: faker.number.int(),
        entry_id: `JRNL-${faker.date.recent().getFullYear()}-${faker.number.int({ min: 1000, max: 9000 })}`,
        type: faker.helpers.arrayElement([
          "Inventory Adjustment",
          "Inventory Transfer",
          "Inventory Write-off",
          "Stock Adjustment",
          "Stock Transfer",
          "Stock Write-off"
        ]),
        reference: {
          pk: faker.number.int(),
          entry_id: `JRNL-${faker.date.recent().getFullYear()}-${faker.number.int({ min: 1000, max: 9000 })}`,
        },
        date: faker.date.recent().toISOString(),
        currency: faker.helpers.arrayElement(["IDR"]),
        items: journalItems,
        total_debit: journalItems.reduce((acc, item) => acc + Number(item.debit), 0),
        total_credit: journalItems.reduce((acc, item) => acc + Number(item.credit), 0),
      }
    });

    return {
      status: "success",
      message: "Success get all journals",
      data: {
        page: page,
        page_size: page_size,
        total_page: data.length,
        items: data
      }
    }
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to get all journals";

    return {
      status: "error",
      message
    }
  }
}

export const getJournal = async ({ pk }: { pk: number }) => { 
  try {
    const journalItems = Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
      number: faker.finance.accountNumber(),
      name: faker.finance.accountName(),
      debit: Number(faker.finance.amount({ min: 100000, max: 1000000 })),
      credit: Number(faker.finance.amount({ min: 100000, max: 1000000 })),
    }));

    const data = {
      pk: pk,
      entry_id: `JRNL-${faker.date.recent().getFullYear()}-${faker.number.int({ min: 1000, max: 9000 })}`,
      type: faker.helpers.arrayElement([
        "Inventory Adjustment",
        "Inventory Transfer",
        "Inventory Write-off",
        "Stock Adjustment",
        "Stock Transfer",
        "Stock Write-off"
      ]),
      reference: {
        pk: faker.number.int(),
        entry_id: `JRNL-${faker.date.recent().getFullYear()}-${faker.number.int({ min: 1000, max: 9000 })}`,
      },
      date: faker.date.recent().toISOString(),
      currency: faker.helpers.arrayElement(["IDR"]),
      items: journalItems,
      total_debit: journalItems.reduce((acc, item) => acc + Number(item.debit), 0),
      total_credit: journalItems.reduce((acc, item) => acc + Number(item.credit), 0),
      last_modified_at: faker.date.recent().toISOString(),
      last_modified_by: {
        pk: faker.number.int({ min: 1, max: 100 }),
        email: faker.internet.email(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
      },
      created_at: faker.date.recent().toISOString(),
      created_by: {
        pk: faker.number.int({ min: 1, max: 100 }),
        email: faker.internet.email(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
      },
    }

    return {
      status: "success",
      message: "Success get journal",
      data
    }
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to get journal";
    
    return {
      status: "error",
      message
    }
  }
}
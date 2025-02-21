"use server"

import { paymentTerms } from "@/constants/modules/sales"
import { faker } from "@faker-js/faker"
import { components } from "@/libs/api/schema/core-services"
import {  customerLegalTypes } from "@/constants/modules/crm"

type Customer = components['schemas']['Contact'];

export const getAllCustomerAccounting = async({
  page = 1, 
  page_size = 10
}: {
  page?: number;
  page_size?: number;
  }) => {
  try {
    const data = Array.from({ length: page_size }).map(() => {
      const customer: Customer = {
        name: faker.company.name(),
        pk: faker.number.int({ min: 100, max: 9999 }),
        image: { url: faker.image.avatar() },
        legal_type: faker.helpers.arrayElement(customerLegalTypes.map((data) => data.values)),
        parent: null,
        tags: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(() => {
          return {
            name: faker.lorem.word(),
            pk: faker.number.int({ min: 100, max: 9999 })
          }
        }),
        tax_id: faker.finance.accountNumber(),
        created_at: faker.date.recent().toISOString(),
        created_by: {
          email: faker.internet.email(),
          first_name: faker.person.firstName(),
          last_name: faker.person.lastName(),
          pk: faker.number.int({ min: 100, max: 9999 }),
          image: { url: faker.image.avatar() },
        },
        deleted_at: null,
        last_modified_at: faker.date.recent().toISOString(),
        last_modified_by: {
          email: faker.internet.email(),
          first_name: faker.person.firstName(),
          last_name: faker.person.lastName(),
          pk: faker.number.int({ min: 100, max: 9999 }),
          image: { url: faker.image.avatar() },
        }
      };
  
      return {
        pk: faker.number.int({ min: 100, max: 9999 }),
        number: `${faker.number.int({ min: 100, max: 9999 })}/${faker.date.recent().getFullYear()}/${faker.number.int({ min: 1, max: 9000 })}`,
        date: faker.date.recent().toISOString(),
        journal: faker.helpers.arrayElement(["Sales", "Purchase", "Payment", "Receipt", "Bank"]),
        payment_method: faker.helpers.arrayElement(["Cash", "Bank Transfer", "Credit Card", "Manual"]),
        customer: customer,
        amount: Number(faker.finance.amount({ min: 100000, max: 1000000 })),
        amount_company_currency: Number(faker.finance.amount({ min: 100000, max: 1000000 })),
        status: faker.helpers.arrayElement(["Drafted", "Posted", "Canceled"]),
        currency: "IDR",
        created_at: faker.date.recent().toISOString(),
        created_by: {
          email: faker.internet.email(),
          first_name: faker.person.firstName(),
          last_name: faker.person.lastName(),
          pk: faker.number.int({ min: 100, max: 9999 }),
          image: { url: faker.image.avatar() },
        },
        last_modified_at: faker.date.recent().toISOString(),
        last_modified_by: {
          email: faker.internet.email(),
          first_name: faker.person.firstName(),
          last_name: faker.person.lastName(),
          pk: faker.number.int({ min: 100, max: 9999 }),
          image: { url: faker.image.avatar() },
        }
      }
    });
    
    return {
      status: "success",
      message: "Successfully get all customer accounting",
      data: {
        items: data,
        page: page,
        page_size: page_size,
        total_page: data.length 
      }
    }
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to get all customer accounting";
    
    return {
      status: "error",
      message
    }
  }
}

interface  CustomerMin {
  pk: number;
  created_at: string;
  last_modified_at: string;
  created_by: components["schemas"]["UserMin"];
  last_modified_by: components["schemas"]["UserMin"] | null;
  contact: components["schemas"]["ContactMin"];
}

export const getCustomerAccounting = async ({ pk }: { pk: number }) => { 
  try {
    const paymentHistory = Array.from({ length: faker.number.int({ min: 5, max: 15 }) }).map(() => { 
      return {
        date: faker.date.recent().toISOString(),
        number: `${faker.number.int({ min: 100, max: 9999 })}/${faker.date.recent().getFullYear()}/${faker.number.int({ min: 1, max: 9000 })}`,
        journal: faker.helpers.arrayElement(["Sales", "Purchase", "Payment", "Receipt", "Bank"]),
        payment_method: faker.helpers.arrayElement(["Cash", "Bank Transfer", "Credit Card", "Manual"]),
        customer: faker.company.name(),
        amount: Number(faker.finance.amount({ min: 100000, max: 1000000 })),
        amount_company_currency: Number(faker.finance.amount({ min: 100000, max: 1000000 })),
        status: faker.helpers.arrayElement(["Drafted", "Posted", "Canceled"])
      }
    });

    const orderDetails = Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(() => { 
      return {
        product_id: faker.number.int({ min: 100, max: 9999 }),
        product_name: faker.commerce.productName(),
        quantity: faker.number.int({ min: 1, max: 10 }),
        uom: faker.helpers.arrayElement(["pcs", "box", "kg"]),
        unit_price: Number(faker.finance.amount({ min: 100000, max: 1000000 })),
        tax: 0.12,
      }
    });

    const journalDetails = Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(() => {
      return {
        account_number: faker.finance.accountNumber(),
        account_name: faker.finance.accountName(),
        debit: Number(faker.finance.amount({ min: 100000, max: 1000000 })),
        credit: Number(faker.finance.amount({ min: 100000, max: 1000000 })),
      }
    });

    const contactMin: components["schemas"]["ContactMin"] = {
      image: { url: faker.image.url() },
      pk: faker.number.int({ min: 999, max: 9999 }),
      legal_type: faker.helpers.arrayElement(customerLegalTypes.map((data) => data.values)),
      name: faker.company.name(),
      parent: null
    }

    const invoices = { 
      pk: pk,
      customer: {
        ...contactMin,
        invoice_id: faker.number.int({ min: 100, max: 9999 }),
      },
      sales_order_id: faker.number.int({ min: 100, max: 9999 }),
      invoice_date: faker.date.recent().toISOString(),
      delivery_date: faker.date.recent().toISOString(),
      due_date: faker.date.recent().toISOString(),
      payment_terms: faker.helpers.arrayElement(paymentTerms),
      currency: "IDR",
      order_details: orderDetails,
      journal_details: journalDetails,
      paymentHistory: paymentHistory,
      attachment: null,
      notes: faker.datatype.boolean() ? faker.lorem.sentence() : null,
    }

    const customerMin: CustomerMin = {
      contact: contactMin,
      created_at: faker.date.recent().toISOString(),
      created_by: {
        email: faker.internet.email(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        pk: faker.number.int({ min: 100, max: 9999 }),
        image: { url: faker.image.avatar() },
      },
      last_modified_at: faker.date.recent().toISOString(),
      last_modified_by: {
        email: faker.internet.email(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        pk: faker.number.int({ min: 100, max: 9999 }),
        image: { url: faker.image.avatar() },
      },
      pk: faker.number.int({ min: 999, max: 9999})
    }

    const contact: components['schemas']['Contact'] = {
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

    const subLedger = Array.from({ length: faker.number.int({ min: 4, max: 10 }) }).map(() => {
      return {
        pk: faker.number.int({ min: 100, max: 9999 }),
        journal: faker.helpers.arrayElement(["Sales", "Purchase", "Payment", "Receipt", "Bank"]),
        account_number: faker.finance.accountNumber(),
        account_name: faker.finance.accountName(),
        invoice_date: faker.date.recent().toISOString(),
        due_date: faker.date.recent().toISOString(),
        year: faker.date.recent().getFullYear(),
        debit: Number(faker.finance.amount({ min: 100000, max: 1000000 })),
        credit: Number(faker.finance.amount({ min: 100000, max: 1000000 })),
        balance: Number(faker.finance.amount({ min: 100000, max: 1000000 })),
      }
    });

    const agings = Array.from({ length: faker.number.int({ min: 4, max: 10 }) }).map(() => {
      return {
        invoice_date: faker.date.recent().toISOString(),
        invoice_number: `${faker.number.int({ min: 100, max: 9999 })}/${faker.date.recent().getFullYear()}/${faker.number.int({ min: 1, max: 9000 })}`,
        currency: "IDR",
        amount_in_original_currency: Number(faker.finance.amount({ min: 100000, max: 1000000 })),
        amount_in_reporting_currency: Number(faker.finance.amount({ min: 100000, max: 1000000 })),
        payment_terms: faker.helpers.arrayElement(paymentTerms),
        bucket: [
          {
            name: "Not Past Due",
            amount: faker.datatype.boolean()
              ? null
              : Number(faker.finance.amount({ min: 100000, max: 1000000 })),
          },
          {
            name: "1-30 Days",
            amount: faker.datatype.boolean()
              ? null
              : Number(faker.finance.amount({ min: 100000, max: 1000000 })),
          },
          {
            name: "31-60 Days",
            amount: faker.datatype.boolean()
              ? null
              : Number(faker.finance.amount({ min: 100000, max: 1000000 })),
          },
          {
            name: "61-90 Days",
            amount: faker.datatype.boolean()
              ? null
              : Number(faker.finance.amount({ min: 100000, max: 1000000 })),
          },
          {
            name: "More than 90 Days",
            amount: faker.datatype.boolean()
              ? null
              : Number(faker.finance.amount({ min: 100000, max: 1000000 })),
          }
        ]
      }
    });

    return {
      status: "success",
      message: "Successfully get customer accounting",
      data: {
        customer: {
          customer: customerMin,
          contact: contact,
        },
        invoices,
        subledger: subLedger,
        agings
      }
    }
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to get customer accounting";
    
    return {
      status: "error",
      message
    }
  }
}
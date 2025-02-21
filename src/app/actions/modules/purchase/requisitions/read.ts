"use server"

import { legalTypes } from "@/constants/modules/organization";
import { deliveryTerms, paymentTerms, salesStatus } from "@/constants/modules/sales";
import { components } from "@/libs/api/schema/sales";
import {components as coreComponents} from "@/libs/api/schema/core-services";
import {faker} from "@faker-js/faker"

type Requisitions = components['schemas']['PaginatedQuotation'];
type Requisition = components['schemas']['Quotation'][];

export const getAllRequisitions = async ({ 
  page,
  page_size = 20,
}: {
    page: number;
    page_size?: number;
}) => { 
  try {
    const items: components['schemas']['QuotationItem'][] = Array.from({ length: 5 }).map(() => ({
      pk: faker.number.int({ min: 1, max: 100 }),
      product: {
        image: { url: faker.image.url() },
        name: faker.commerce.productName(),
        pk: faker.number.int({ min: 1, max: 100 }),
        price: Number(faker.finance.amount({ min: 50000, max: 1000000 })),
        stock: faker.number.int({ min: 1, max: 100 }),
      },
      price: Number(faker.finance.amount({ min: 50000, max: 1000000 })),
      discount_rate: Number(faker.number.float({ min: 0, max: 0.5 })),
      quantity: Number(faker.number.int({ min: 1, max: 10 })),
      total: Number(faker.finance.amount({ min: 50000, max: 1000000 })),
      total_discount: Number(faker.finance.amount({ min: 50000, max: 1000000 })),
      total_net: Number(faker.finance.amount({ min: 50000, max: 1000000 })),
      total_vat: Number(faker.finance.amount({ min: 50000, max: 1000000 })),
      vat: {
        pk: faker.number.int({ min: 1, max: 100 }),
        country: {
          iso_a2: "ID",
          iso_a3: "IDN",
          iso_n: 360,
          name: "Indonesia",
          pk: 1,
        },
        name: "Value Added Tax",
        rate: 0.11,
      },
      vat_rate: 0.11
    }));

    const dummyData: Requisition = Array.from({ length: page_size }).map((_, index) => ({
      pk: index + 1,
      currency: {
        iso: "IDR",
        name: "Indonesian Rupiah",
        pk: 1,
        symbol: "Rp",
      },
      delivery_terms: faker.helpers.arrayElement(deliveryTerms),
      discount_rate: faker.number.float({ min: 0, max: 0.5 }),
      payment_dp: faker.number.float({ min: 0, max: 0.5 }),
      payment_dp_rate: faker.number.float({ min: 0, max: 0.5 }),
      payment_n: faker.number.int({ min: 1, max: 12 }),
      payment_terms: faker.helpers.arrayElement(paymentTerms),
      status: faker.helpers.arrayElement(salesStatus),
      last_modified_at: faker.date.recent().toISOString(),
      items: items,
      total: items.reduce((acc, item) => acc + item.total, 0),
      total_discount: items.reduce((acc, item) => acc + item.total_discount, 0),
      total_net: items.reduce((acc, item) => acc + item.total_net, 0),
      total_vat: items.reduce((acc, item) => acc + item.total_vat, 0),
      last_modified_by: {
        image: { url: faker.image.avatar() },
        pk: faker.number.int({ min: 1, max: 100 }),
        email: faker.internet.email(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
      },
      created_at: faker.date.recent().toISOString(),
      created_by: {
        image: { url: faker.image.avatar() },
        pk: faker.number.int({ min: 1, max: 100 }),
        email: faker.internet.email(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
      },
    }));

    const requisitions: Requisitions = {
      items: dummyData,
      page: page,
      total_items: dummyData.length * 10,
      total_page: 10,
    }

    return {
      status: "success",
      message: "Requsitions fetched successfully",
      data: requisitions,
    }

  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to fetch Requisitions";
    
    return {
      status: "error",
      message
    }
  }
}

type Vendor = coreComponents['schemas']['Contact'];
type DetailRequisition = components['schemas']['Quotation'];
type RequisitionItems = components['schemas']['QuotationItem'];

export const getRequitions = async ({ pk }: { pk: number }) => {
  try {
    const vendor: Vendor = {
      name: faker.company.name(),
      image: { url: faker.image.avatar() },
      legal_type: faker.helpers.arrayElement(legalTypes.map(val => val.values)),
      parent: null,
      pk: faker.number.int({ min: 1, max: 100 }),
      created_at: faker.date.recent().toISOString(),
      created_by: {
        image: { url: faker.image.avatar() },
        pk: faker.number.int({ min: 1, max: 100 }),
        email: faker.internet.email(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
      },
      deleted_at: null,
      last_modified_at: faker.date.recent().toISOString(),
      last_modified_by: {
        image: { url: faker.image.avatar() },
        pk: faker.number.int({ min: 1, max: 100 }),
        email: faker.internet.email(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
      },
      tags: Array.from({ length: 5 }).map(() => ({
        pk: faker.number.int({ min: 1, max: 100 }),
        name: faker.commerce.department()
      })),
      tax_id: faker.finance.accountNumber(),
    };

    const items: RequisitionItems[] = Array.from({ length: 5 }).map(() => ({
      pk: faker.number.int({ min: 1, max: 100 }),
      price: Number(faker.finance.amount({ min: 50000, max: 1000000 })),
      discount_rate: Number(faker.number.float({ min: 0, max: 0.5 })),
      product: {
        image: { url: faker.image.url() },
        name: faker.commerce.productName(),
        pk: faker.number.int({ min: 1, max: 100 }),
        price: Number(faker.finance.amount({ min: 50000, max: 1000000 })),
        stock: faker.number.int({ min: 1, max: 100 }),
      },
      quantity: Number(faker.number.int({ min: 1, max: 10 })),
      total: Number(faker.finance.amount({ min: 50000, max: 1000000 })),
      total_discount: Number(faker.finance.amount({ min: 50000, max: 1000000 })),
      total_net: Number(faker.finance.amount({ min: 50000, max: 1000000 })),
      total_vat: Number(faker.finance.amount({ min: 50000, max: 1000000 })),
      vat: {
        pk: faker.number.int({ min: 1, max: 100 }),
        country: {
          iso_a2: "ID",
          iso_a3: "IDN",
          iso_n: 360,
          name: "Indonesia",
          pk: 1,
        },
        name: "Value Added Tax",
        rate: 0.12,
      },
      vat_rate: 0.12
    }));

    const quotation: DetailRequisition = {
      pk: pk,
      status: faker.helpers.arrayElement(["Draft", "Approved", "Sent", "Cancelled"]),
      currency: {
        iso: "IDR",
        name: "Indonesian Rupiah",
        pk: 1,
        symbol: "Rp",
      },
      delivery_terms: faker.helpers.arrayElement(deliveryTerms),
      discount_rate: Number(faker.number.float({ min: 0, max: 0.5 })),
      payment_dp: Number(faker.number.float({ min: 0, max: 0.5 })),
      payment_dp_rate: Number(faker.number.float({ min: 0, max: 0.5 })),
      payment_n: faker.number.int({ min: 1, max: 12 }),
      created_at: faker.date.recent().toISOString(),
      created_by: {
        image: { url: faker.image.avatar() },
        pk: faker.number.int({ min: 1, max: 100 }),
        email: faker.internet.email(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
      },
      last_modified_at: faker.date.recent().toISOString(),
      last_modified_by: {
        image: { url: faker.image.avatar() },
        pk: faker.number.int({ min: 1, max: 100 }),
        email: faker.internet.email(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
      },
      items: items,
      total: items.reduce((acc, item) => acc + item.total, 0),
      total_discount: items.reduce((acc, item) => acc + item.total_discount, 0),
      total_net: items.reduce((acc, item) => acc + item.total_net, 0),
      total_vat: items.reduce((acc, item) => acc + item.total_vat, 0), 
      payment_terms: faker.helpers.arrayElement(paymentTerms),
    }
    
    return {
      status: "success",
      message: "Quotation fetched successfully",
      data: {
        quotation,
        vendor
      }
    }
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to fetch quotation";
    
    return {
      status: "error",
      message
    }
  }
}
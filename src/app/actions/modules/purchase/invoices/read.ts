"use server"

import { leadStatus } from "@/constants/modules/crm";
import { legalTypes } from "@/constants/modules/organization";
import { deliveryTerms, invoiceStatus, paymentTerms } from "@/constants/modules/sales";
import { components } from "@/libs/api/schema/sales"
import { faker } from "@faker-js/faker";

type Invoice = components['schemas']['Invoice'];
type Invoices = components['schemas']['PaginatedInvoice'];

export const getAllInvoices = async ({
  page,
  page_size,
}: {
  page: number;
  page_size: number;
}) => {
  try {
    const dummyData: Invoice[] = Array.from({ length: page_size }, (_, index) => {
      const items: components['schemas']['InvoiceItem'][] = Array.from({ length: 5 }).map(() => ({
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
    
      const customer: components['schemas']['QuotationMin']['customer'] = {
        contact: {
          image: {
            url: faker.image.avatar()
          },
          legal_type: faker.helpers.arrayElement(legalTypes.map((type) => type.values)),
          name: faker.company.name(),
          parent: null,
          pk: faker.number.int({ min: 1, max: 100 }),
        },
        pk: faker.number.int({ min: 1, max: 100 }),
      };
    
      const quotationItems: components['schemas']['QuotationMin'] = {
        pk: faker.number.int({ min: 1, max: 100 }),
        currency: {
          iso: "IDR",
          name: "Indonesian Rupiah",
          pk: 1,
          symbol: "Rp",
        },
        lead: {
          lead_score: String(faker.number.int({ min: 1, max: 100 })),
          customer: customer,
          customer_name: faker.company.name(),
          lead_id: faker.string.uuid(),
          lead_status: faker.helpers.arrayElement(leadStatus),
          name: faker.company.name(),
          pk: faker.number.int({ min: 1, max: 100 }),
        },
        customer: customer,
        delivery_terms: faker.helpers.arrayElement(deliveryTerms),
        payment_terms: faker.helpers.arrayElement(paymentTerms),
        status: faker.helpers.arrayElement(invoiceStatus)
      };

      const order: components['schemas']['Invoice']['order'] = {
        pk: index + 1,
        currency: {
          iso: "IDR",
          name: "Indonesian Rupiah",
          pk: 1,
          symbol: "Rp",
        },
        delivery_terms: faker.helpers.arrayElement(deliveryTerms),
        payment_terms: faker.helpers.arrayElement(paymentTerms),
        status: faker.helpers.arrayElement(salesStatus),
        total: items.reduce((acc, item) => acc + item.total, 0),
        total_discount: items.reduce((acc, item) => acc + item.total_discount, 0),
        total_net: items.reduce((acc, item) => acc + item.total_net, 0),
        total_vat: items.reduce((acc, item) => acc + item.total_vat, 0),
        customer: customer,
        lead: {
          lead_score: faker.number.int({ min: 1, max: 100 }),
          customer: customer,
          customer_name: faker.company.name(),
          lead_id: faker.string.uuid(),
          lead_status: faker.helpers.arrayElement(leadStatus),
          name: faker.company.name(),
          pk: faker.number.int({ min: 1, max: 100 }),
        },
        quotation: quotationItems,
      };

      return {
        pk: faker.number.int({ min: 1, max: 1000 }),
        items: items,
        order: order,
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
        total: items.reduce((acc, item) => acc + item.total, 0),
        total_discount: items.reduce((acc, item) => acc + item.total_discount, 0),
        total_net: items.reduce((acc, item) => acc + item.total_net, 0),
        total_invoiced: items.reduce((acc, item) => acc + item.total, 0),
        total_vat: items.reduce((acc, item) => acc + item.total_vat, 0),
      }
    });

    const dummyInvoice: Invoices = {
      items: dummyData,
      page: page,
      total_items: dummyData.length * 10,
      total_page: 10
    }

    return {
      status: "success",
      message: "Success get all invoices",
      data: dummyInvoice,
    }

  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to get all invoices";
    
    return {
      status: "error",
      message
    }
  }
}
"use server"

import { leadStatus } from "@/constants/modules/crm";
import { legalTypes } from "@/constants/modules/organization";
import { deliveryTerms, paymentTerms, salesStatus } from "@/constants/modules/sales";
import { components } from "@/libs/api/schema/sales";
import { faker } from "@faker-js/faker"

type Orders = components['schemas']['PaginatedOrder'];
type Order = components['schemas']['Order'][];

export const getAllOrders = async ({
  page,
  page_size = 20,
}: {
  page: number;
  page_size?: number;
}) => { 
  try {
      const items: components['schemas']['OrderItem'][] = Array.from({ length: 5 }).map(() => ({
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
  
      const dummyData: Order = Array.from({ length: page_size }).map((_, index) => {
        // Generate unique customer for each order
        const customer: components['schemas']['QuotationMin']['customer'] = {
          contact: {
            image: { url: faker.image.avatar() },
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
            lead_score: faker.number.int({ min: 1, max: 100 }),
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
          status: faker.helpers.arrayElement(salesStatus),
          total: items.reduce((acc, item) => acc + item.total, 0),
          total_discount: items.reduce((acc, item) => acc + item.total_discount, 0),
          total_net: items.reduce((acc, item) => acc + item.total_net, 0),
          total_vat: items.reduce((acc, item) => acc + item.total_vat, 0),
        };
  
        return {
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
          items: items,
          quotation: quotationItems,
        };
      });
  
      const dummyOrders: Orders = {
        items: dummyData,
        page: page,
        total_items: dummyData.length * 10,
        total_page: 10,
      };
  
      return {
        status: "success",
        message: "Orders fetched successfully",
        data: dummyOrders,
      };
  
    } catch {
      return {
        status: "error",
        message: "Failed to fetch orders",
      };
    }
}

export const getQuotationForOrder = async ({ quotationId }: { quotationId: number }) => { 
  try {
    const items: components['schemas']['OrderItem'][] = Array.from({ length: 5 }).map(() => ({
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
        rate: 0.12,
      },
      vat_rate: 0.12,
    }));
    
    const data: components['schemas']['Quotation'] = {
      pk: quotationId,
      status: faker.helpers.arrayElement(salesStatus),
      currency: {
        iso: "IDR",
        name: "Indonesian Rupiah",
        pk: 1,
        symbol: "Rp",
      },
      delivery_terms: faker.helpers.arrayElement(deliveryTerms),
      payment_dp: faker.number.float({ min: 0, max: 0.5 }),
      payment_dp_rate: faker.number.float({ min: 0, max: 0.5 }),
      payment_n: faker.number.int({ min: 1, max: 12 }),
      payment_terms: faker.helpers.arrayElement(paymentTerms),
      discount_rate: faker.number.float({ min: 0, max: 0.5 }),
      items: items,
      total: items.reduce((acc, item) => acc + item.total, 0),
      total_discount: items.reduce((acc, item) => acc + item.total_discount, 0),
      total_net: items.reduce((acc, item) => acc + item.total_net, 0),
      total_vat: items.reduce((acc, item) => acc + item.total_vat, 0),
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
    }

    return { 
      status: "success",
      message: "Quotation fetched successfully",
      data
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

const orders = Array.from({ length: 100 }, () => ({
  order_id: faker.number.int({ min: 10000, max: 99999 }),
  customer_name: faker.company.name(),
}));

export const getInitialOrderOptions = async ({ limit }: { limit: number }) => {
  try {
    const filteredOrders = orders.slice(0, limit);

    return filteredOrders;
  } catch (error) {
    console.error("Error fetching order options:", error);
    throw new Error("Unable to fetch order options");
  }
}

export const getOrderOptions = async ({ orderId }: { orderId: string }) => {
  try {
    const filteredOrders = orders.filter((order) =>
      order.order_id.toString().includes(orderId) 
    );

    return filteredOrders;
  } catch (error) {
    console.error("Error fetching order options:", error);
    throw new Error("Unable to fetch order options");
  }
};
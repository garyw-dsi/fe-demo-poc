"use server"

import { components } from "@/libs/api/schema/core-services";
import { crmClient } from "@/libs/api/services/crm";
import { coreClient } from "@/libs/api/services/core";
import { getContact } from "@/app/actions/modules/core/contacts";

interface Customers {
  page: number;
  page_size: number;
  name?: string | undefined;
  legal_types?: components['schemas']['ContactLegalType'] | undefined;
}

export const getAllCustomers = async ({
  page,
  page_size,
  name,
  legal_types
}: Customers) => { 
  try {
    const { response, data } = await crmClient.GET("/customer/", {
      params: {
        query: {
          page: page,
          page_size: page_size,
          contact___name__icontains: name || undefined,
          legal_type: legal_types || undefined
        }
      }
    });

    if (response.ok) {
      return {
        status: "success",
        message: "Customers fetched successfully",
        data: data
      }
    }

    if (response.status === 500) {
      throw new Error("Internal server error")
    }

    throw new Error("Failed to fetch customers")
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to fetch customers"
    
    return {
      status: "error",
      message
    }
  }
}

export const getCustomer = async ({ pk }: { pk: number }) => { 
  try {
    const { response, data } = await crmClient.GET("/customer/{customer_id}/", {
      params: {
        path: {
          customer_id: pk
        }
      }
    });

    if (
      response.ok &&
      data
    ) {
      const contactId = data.contact.pk;

      const { status, data: contactData, message } = await getContact({ contactId })

      if (status === "success" && contactData) {
        return {
          status: "success",
          message: "Fetched customer successfully",
          data: {
            customer: data,
            contact: contactData.contact,
            address: contactData.address,
            industry: contactData.industry
          }
        };
      }

      throw new Error(message);
    }

    if (response.status === 500) {
      throw new Error("Internal server error")
    }

    if (response.status === 404) {
      throw new Error("Customer not found")
    }

    throw new Error("Failed to fetch customer")
  } catch (error) {
    const message = error instanceof Error  
      ? error.message
      : "Failed to fetch customer"
    
    return {
      status: "error",
      message
    }
  }
}

export const getCustomerOptions = async ({ name }: { name: string }) => {
  try {
    const { response, data } = await coreClient.GET("/options/contact/", {
      params: {
        query: {
          name__icontains: name
        }
      }
    });

    if (
      response.ok && 
      data
    ) {
      return data.items;
    }

    return null;
  } catch {
    return null;
  }
}
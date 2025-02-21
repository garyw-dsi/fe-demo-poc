"use server"

import { components } from "@/libs/api/schema/sales";
import { salesClient } from "@/libs/api/services/sales";

export const getAllInvoices = async ({
  page,
  page_size,
  status,
  invoiceId
}: {
  page: number;
  page_size: number;
  status?: components['schemas']['InvoiceStatus'];
  invoiceId?: string;
}) => {
  try {
    const { response, data } = await salesClient.GET("/invoice/", {
      params: {
        query: {
          page: page,
          page_size: page_size,
          invoice_id__icontains: invoiceId,
          status: status,
        }
      }
    });

    if (response.ok) {
      return {
        status: "success",
        message: "Success get all invoices",
        data
      }
    }

    if (response.status === 500) {
      throw new Error("Internal server error");
    }

    throw new Error("Failed to get all invoices");
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

export const getInvoice = async({ 
  pk
}: {
  pk: number
}) => {
  try {
    const { response, data } = await salesClient.GET("/invoice/{invoice_id}/", {
      params: {
        path: {
          invoice_id: pk
        }
      }
    });

    if (response.ok) {
      return {
        status: "success",
        message: "Success get invoice",
        data
      }
    }

    if (response.status === 500) {
      throw new Error("Internal server error");
    }

    throw new Error("Failed to get invoice");
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to get invoice";
    
    return {
      status: "error",
      message
    }
  }
}
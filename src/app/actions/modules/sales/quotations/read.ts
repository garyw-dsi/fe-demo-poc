"use server"

import { components } from "@/libs/api/schema/sales";
import { salesClient } from "@/libs/api/services/sales";

interface Props {
  page: number;
  page_size: number;
  status?: components['schemas']['Quotation']['status'];
  payment_term?: components['schemas']['Quotation']['payment_term'];
  delivery_term?: components['schemas']['Quotation']['delivery_term'];
  quotation_id?: string;
}

export const getAllQuotations = async ({ 
  page,
  page_size = 10,
  status,
  payment_term,
  delivery_term,
  quotation_id
}: Props) => { 
  try {
    const { response, data } = await salesClient.GET("/quotation/", {
      params: {
        query: {
          page: page,
          page_size: page_size,
          status: status,
          payment_term: payment_term,
          delivery_term: delivery_term,
          quotation_id__icontains: quotation_id
        }
      }
    });

    if (response.ok) {
      return {
        status: "success",
        message: "Quotations fetched successfully",
        data
      }
    }

    if (response.status === 500) {
      throw new Error("Internal server error");
    }

    throw new Error("Failed to fetch quotations");

  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to fetch quotations";
    
    return {
      status: "error",
      message
    }
  }
}

export const getQuotations = async ({ pk }: { pk: number }) => {
  try {
    const { response, data } = await salesClient.GET("/quotation/{quotation_id}/", {
      params: {
        path: {
          quotation_id: pk
        }
      }
    });

    if (response.ok) {
      return {
        status: "success",
        message: "Quotation fetched successfully",
        data: data
      }
    }

    if(response.status === 500) {
      throw new Error("Internal server error");
    }

    throw new Error("Failed to fetch quotation");
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
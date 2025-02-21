"use server"

import { coreClient } from "@/libs/api/services/core";

interface Currency {
  page: number;
  page_size: number;
  name?: string | undefined;
  country_id?: number | undefined;
  iso?: string | undefined;
  symbol?: string | undefined;
}

export const getAllCurrency = async({
  page,
  page_size,
  name,
  country_id,
  iso,
  symbol
}: Currency) => {
  try {
    const { response, data } = await coreClient.GET("/currency/", {
      params: {
        query: {
          page: page,
          page_size: page_size,
          country_id: country_id || undefined,
          name: name || undefined,
          iso: iso || undefined,
          symbol: symbol || undefined
        }
      }
    });

    if (response.ok) {
      return {
        status: "success",
        message: "Success get all currency",
        data: data
      }
    }

    if (response.status === 500) {
      throw new Error("Internal server error")
    }

    throw new Error("Error fetched currency");
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Error fetched currency";
    
    return {
      status: "error",
      message
    }
  }
}

export const getAllCurrencyOption = async () => {
  try {
    const { response, data } = await coreClient.GET("/currency/");

    if (response.ok && data) {
      return {
        status: "success",
        data: data.items
      }
    }

    throw new Error("Failed to get currency");
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to get currency"
    
    return {
      status: "error",
      message
    }
  }
}
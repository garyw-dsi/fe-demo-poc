"use server"

import { coreClient } from "@/libs/api/services/core"

interface Vat {
  country_id?: number;
  name?: string;
  page: number;
  page_size: number;
}

export const getAllVat = async ({ 
  country_id,
  name,
  page,
  page_size
}: Vat) => {
  try {
    const { response, data } = await coreClient.GET("/vat/", {
      params: {
        query: {
          country_id: country_id || undefined,
          name: name || undefined,
          page: page,
          page_size: page_size
        }
      }
    });

    if (response.ok) {
      return {
        status: "success",
        message: "Success get all vat",
        data: data
      }
    }

    if (response.status === 500) {
      throw new Error("Internal server error")
    }

    throw new Error("Error fetched vat")
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "error fetched vat"
    
    return {
      status: "error",
      message
    }
  }
}

export const getVatOptions = async ({
  name
}: {
  name: string
}) => {
  try {
    const { response, data } = await coreClient.GET("/options/vat/", {
      params: {
        query: {
          name: name
        }
      }
    });

    if (response.ok) {
      return {
        status: "success",
        message: "Success get vat options",
        data: data
      }
    }

    if (response.status === 500) {
      throw new Error("Internal server error")
    }

    throw new Error("Error fetched vat options")
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "error fetched vat options"
    
    return {
      status: "error",
      message
    }
  }
}
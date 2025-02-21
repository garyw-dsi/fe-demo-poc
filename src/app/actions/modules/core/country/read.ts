"use server"

import { coreClient } from "@/libs/api/services/core";

interface Country {
  page: number;
  page_size: number;
  name: string | undefined;
  iso_a3: string | undefined;
}

export const getAllCountry = async({
  page,
  page_size,
  name,
  iso_a3
}: Country) => {
  try {
    const { response, data } = await coreClient.GET("/country/", {
      params: {
        query: {
          page: page,
          page_size: page_size,
          iso_a3: iso_a3 || undefined,
          name: name || undefined,
        }
      }
    });

    if (response.ok) {
      return {
        status: "success",
        message: "Success get all country",
        data: data
      }
    }

    if (response.status === 500) {
      throw new Error("Internal server error")
    }

    throw new Error("Error fetched country");
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Error fetched country";
    
    return {
      status: "error",
      message
    }
  }
}
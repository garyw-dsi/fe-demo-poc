"use server"

import { coreClient } from "@/libs/api/services/core";

export const getContactAddressById = async({ 
  contactId
}: {
  contactId: number;
}) => {
  try {
    const { response, data } = await coreClient.GET("/address/", {
      params: {
        query: {
          contact_id: contactId
        }
      }
    });

    if (response.ok && data) {
      return {
        status: "success",
        message: "Customer address fetched successfully",
        data: data.items
      }
    }

    return {
      status: "error",
      message: "Failed to fetch customer address",
    }
  } catch {
    return {
      status: "error",
      message: "Failed to fetch customer address",
    }
  }  
}
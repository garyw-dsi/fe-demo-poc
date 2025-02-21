"use server"

import { coreClient } from "@/libs/api/services/core";

export const getContactIndustryById = async ({
  contactId
}: {
  contactId: number
}) => {
  try {
    const { response, data } = await coreClient.GET("/industry/", {
      params: {
        query: {
          contact_id: contactId
        }
      }
    });

    if (response.ok && data) {
      return {
        status: "success",
        message: "Customer industry fetched successfully",
        data: data.items
      }
    }

    return {
      status: "error",
      message: "Failed to fetch customer industry",
    }
  } catch {
    return {
      status: "error",
      message: "Failed to fetch customer industry"
    }
  }
}
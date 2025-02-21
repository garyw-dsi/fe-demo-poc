"use server"

import { components } from "@/libs/api/schema/crm";
import { crmClient } from "@/libs/api/services/crm";

interface GetAllPipelines { 
  page: number;
  page_size: number;
  name: string | undefined;
  lead_source: components['schemas']['LeadSource'] | undefined;
  lead_status: components['schemas']['LeadStatus'] | undefined;
}

export const getAllPipelines = async ({
  page,
  page_size,
  name,
  lead_source,
  lead_status
}: GetAllPipelines) => {
  try {
    const { response, data } = await crmClient.GET("/lead/", {
      params: {
        query: {
          page: page,
          page_size: page_size,
          name: name,
          lead_source: lead_source,
          lead_status: lead_status
        }
      }
    });

    if (response.ok && data) {
      return {
        status: "success",
        message: "Successfully fetched pipelines",
        data: data 
      }
    }

    return {
      status: "error",
      message: "Failed to fetch pipelines",
    }
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Failed to fetch pipelines",
    }
  }
}
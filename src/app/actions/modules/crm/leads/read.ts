"use server"

import { components } from "@/libs/api/schema/crm";
import { components as coreComponents } from "@/libs/api/schema/core-services";
import { crmClient } from "@/libs/api/services/crm";

interface GetAllLeads { 
  page: number;
  page_size: number;
  name?: string | undefined;
  lead_source?: components['schemas']['LeadSource'] | undefined;
  lead_status?: components['schemas']['LeadStatus'] | undefined;
  industry_type?: coreComponents['schemas']['IndustryType'] | undefined;
  tag_id?: number | undefined;
  customer_id?: string | undefined;
}

export const getAllLeads = async ({
  page,
  page_size,
  name,
  lead_source,
  lead_status,
  industry_type,
  tag_id,
  customer_id
}: GetAllLeads) => {
  try {
    const { response, data } = await crmClient.GET("/lead/", {
      params: {
        query: {
          page: page,
          page_size: page_size,
          name__icontains: name,
          lead_source: lead_source,
          lead_status: lead_status,
          customer___contact___industries___industry_type: industry_type,
          tag_id: tag_id,
          customer_id: Number(customer_id) || undefined
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

export const getLead = async ({ pk }: { pk: number }) => {
  try {
    const { response, data } = await crmClient.GET("/lead/{lead_id}/", {
      params: {
        path: {
          lead_id: Number(pk)
        }
      }
    });

    if (response.ok) {
      return {
        status: "success",
        message: "Successfully fetched lead",
        data: data
      }
    }

    return {
      status: "error",
      message: "Failed to fetch lead",
    }
  } catch {
    return {
      status: "error",
      message: "Failed to fetch lead",
    }
  }
}

export const getLeadOptions = async ({ name, customer_id }: { name: string; customer_id?: string }) => {
  try {
    const { response, data } = await crmClient.GET("/options/lead/", {
      params: {
        query: {
          name__icontains: name,
          customer_id: Number(customer_id) || undefined
        }
      }
    });

    if (response.ok && data) {
      return data.items;
    }

    return null;
  } catch {
    return null;
  }
}
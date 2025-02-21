"use server"

import { components } from "@/libs/api/schema/core-services";
import { coreClient } from "@/libs/api/services/core";

export const setContactIndustry = async ({
  pk, industry_type
}: components['schemas']['IndustryOpt']) => {
  try {
    const body: components['schemas']['IndustryCreate'] = {
      contact_id: pk,
      industry_type: industry_type
    };

    const { response } = await coreClient.POST('/industry/', { body });
    return response.ok;
  } catch (error) {
    console.error("Error setting customer industry:", error);
    return false;
  }
}
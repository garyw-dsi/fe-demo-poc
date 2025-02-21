"use server"

import { components } from "@/libs/api/schema/core-services";
import { coreClient } from "@/libs/api/services/core";

export const updateContactIndustry = async({
  industry_id,
  type
}: {
  industry_id: number;
  type: components['schemas']['IndustryType']
}) => {
  try {
    const { response } = await coreClient.PUT("/industry/{industry_id}/", {
      params: {
        path: {
          industry_id: industry_id
        }
      },
      body: {
        industry_type: type
      }
    });

    return response.ok
  } catch {
    return false;
  }
}
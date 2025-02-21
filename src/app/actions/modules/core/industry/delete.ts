"use server"

import { coreClient } from "@/libs/api/services/core";

export const deleteContactIndustry = async({
  industry_id
}: {
  industry_id: number
}) => {
  try {
    const { response } = await coreClient.DELETE("/industry/{industry_id}/", {
      params: {
        path: {
          industry_id: Number(industry_id)
        }
      }
    })

    return response.ok;
  } catch {
    return false;
  }
}
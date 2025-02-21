"use server"

import { FormState } from "@/libs/api/constants";
import { crmClient } from "@/libs/api/services/crm"
import { revalidatePath } from "next/cache";

export const deleteLead = async ({
  leadId
}: {
  leadId: number
}): Promise<FormState> => {
  try {
    const { response } = await crmClient.DELETE("/lead/{lead_id}/", {
      params: {
        path: {
          lead_id: Number(leadId)
        }
      }
    });

    if (response.ok) {
      revalidatePath("/modules/crm/leads");
      revalidatePath("/modules/crm/pipelines");

      return {
        status: "success",
        message: "Lead deleted successfully"
      }
    }

    return {
      status: "error",
      message: "Failed to delete lead"
    }
  } catch {
    return {
      status: "error",
      message: "Failed to delete lead"
    }
  }
}
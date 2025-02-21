"use server"

import { FormState } from "@/libs/api/constants";
import { components } from "@/libs/api/schema/crm";
import { crmClient } from "@/libs/api/services/crm";
import { revalidatePath } from "next/cache";

export const editLead = async(
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    console.log(formData);
    const leadId = formData.get("pk")

    const phoneCode = formData.get("phone_code")
    const phone = formData.get("phone")

    const formattedPhone = `${phoneCode}${phone}`

    const body: components["schemas"]["LeadUpdate"] = {
      name: formData.get("name") as string,
      lead_source: formData.get("lead_source") as components["schemas"]["LeadSource"],
      lead_score: Number(formData.get("lead_score")),
      tags: formData.getAll("tags")
        .filter((tag) => tag !== "")
        .map((tag) => Number(tag)),
      
      customer_name: formData.get("customer_name") as string,
      customer_id: formData.get("customer_id") === ""
        ? null
        : Number(formData.get("customer_id")),
        
      contact_name: formData.get("contact_name") === ""
        ? null
        : formData.get("contact_name") as string,
      
      email: formData.get("email") === ""
        ? null
        : formData.get("email") as string,
      
      address: formData.get("address") === ""
        ? null
        : formData.get("address") as string,
      
      phone: formData.get("phone")
        ? formattedPhone
        : null
    };

    const { response } = await crmClient.PUT("/lead/{lead_id}/", {
      params: {
        path: {
          lead_id: Number(leadId)
        }
      },
      body: body
    });

    if (response.ok) {
      revalidatePath("/modules/crm/leads");
      revalidatePath("/modules/crm/pipelines");

      return {
        status: "success",
        message: "Lead updated successfully"
      }
    }

    return {
      status: "error",
      message: "Failed to update lead"
    }
  } catch {
    return {
      status: "error",
      message: "Failed to update lead"
    }
  }
}

export const changeLeadStatus = async({
  leadId,
  status
}: {
  leadId: number,
  status: components["schemas"]["SetLeadStatus"]["lead_status"]
}) => {
  try {
    const { response } = await crmClient.PUT("/lead/{lead_id}/set_status/", {
      params: {
        path: {
          lead_id: leadId
        }
      },
      body: {
        lead_status: status
      }
    });

    if (response.ok) {
      revalidatePath("/modules/crm/leads");
      revalidatePath("/modules/crm/pipelines");

      return {
        status: "success",
        message: "Lead status updated successfully"
      }
    }

    return {
      status: "error",
      message: "Failed to update lead status"
    }
  } catch {
    return {
      status: "error",
      message: "Failed to update lead status"
    }
  }
}
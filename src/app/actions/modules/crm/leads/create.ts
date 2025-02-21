"use server"

import { FormState } from "@/libs/api/constants"
import { components } from "@/libs/api/schema/crm"
import { crmClient } from "@/libs/api/services/crm"
import { revalidatePath } from "next/cache"

export const createLead = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    const phoneCode = formData.get("phone_code")
    const phone = formData.get("phone")

    const formattedPhone = `${phoneCode}${phone}`

    const body: components["schemas"]["LeadCreate"] = {
      name: formData.get("name") as string,
      lead_source: formData.get("lead_source") as components["schemas"]["LeadSource"],
      lead_score: Number(formData.get("lead_score")),
      tags: formData.getAll("tags")
        .filter((tag) => tag !== "")
        .map((tag) => Number(tag)),
      
      customer_name: formData.get("customer_name") as string,
      customer_id: formData.get("customer_id")
        ? Number(formData.get("customer_id"))
        : null,
        
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

    console.log(JSON.stringify(body))

    const { response } = await crmClient.POST('/lead/', {
      body: body
    });

    if (response.ok) {
      revalidatePath("/modules/crm/leads");
      revalidatePath("/modules/crm/pipelines");
      
      return {
        status: "success",
        message: "Lead created successfully"
      }
    }
    
    if (response.status === 400) {
      throw new Error("Opportunity name already exist in the current customer")
    }

    if ([500, 422].includes(response.status)) { 
      throw new Error("Internal server error")
    }
    
    throw new Error("Failed to create lead")
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to create lead"
    
    return {
      status: "error",
      message
    }
  }
}
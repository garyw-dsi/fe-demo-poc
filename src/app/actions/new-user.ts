"use server"

import { FormState } from "@/libs/api/constants"
import { components } from "@/libs/api/schema/uam";
import { uamClient } from "@/libs/api/services/uam";
import { revalidateTag } from "next/cache";

export const registrationCompany = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => { 
  const legal_name = formData.get('legal_name') as string;
  const legal_type = formData.get('legal_type') as components["schemas"]["OrganizationLegalType"];

  try {
    const { response, data, error } = await uamClient.POST("/organization/", {
      body: {
        legal_name: legal_name,
        legal_type: legal_type,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response,data, error);
    
    if (response.status === 200 && data) {
      revalidateTag("new-user");
      
      return {
        message: "Company registered successfully",
        status: "success",
      }
    }

    const message = Array.isArray(error?.detail)
      ? error.detail[0].msg
      : String(error?.detail);
    
    return {
      message: message || "Error while registering your company",
      status: "error",
    }
  } catch (error) {
    console.log("Registration error:", error);
    return {
      message: "Error while registering your company",
      status: "error",
    } 
  }
}
"use server"

import { FormState } from "@/libs/api/constants";
import { crmClient } from "@/libs/api/services/crm";
import { createContact } from "@/app/actions/modules/core/contacts";
import { revalidatePath } from "next/cache";

export const createCustomer = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    /**
     * @description
     * add the is_customer field to the form data
     * so that the contact can be used as a customer
     */
    formData.append("is_customer", "true");

    const { status, message } = await createContact(prevState, formData);
    
    if (status === "error") {
      return {
        status: "error",
        message: message,
      }
    }

    revalidatePath("/modules/crm/customers");

    return {
      status: "success",
      message: "Customer created successfully",
    }

  } catch {
    return {
      status: "error",
      message: "An error occurred while creating the customer",
    };
  }
};

/**
 * @param contactId
 * @description
 * create the customer for the contact module
 * so that the contact can be used as a customer 
 * @returns 
 */
export const createContactCustomer = async({ 
  contactId
}: {
  contactId: number;
}) => {
  try {
    const { response } = await crmClient.POST("/customer/", {
      body: {
        contact_id: contactId
      }
    });

    if (response.ok) {
      return {
        status: "success",
        message: "Customer created successfully"
      }
    }

    return {
      status: "error",
      message: "Failed to create customer"
    }
  } catch {
    return {
      status: "error",
      message: "Failed to create customer"
    }
  }
}
"use server";

import { revalidatePath } from "next/cache";
import { FormState } from "@/libs/api/constants";
import { updateContact } from "@/app/actions/modules/core/contacts";

export const updateCustomer = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    const { status, message } = await updateContact(prevState, formData);

    if (status === "error") {
      return {
        status: "error",
        message: message,
      }
    }

    revalidatePath("/modules/crm/customers");

    return {
      status: "success",
      message: message,
    }
  } catch {
    return {
      status: "error",
      message: "An error occurred while creating the customer",
    }
  }
}
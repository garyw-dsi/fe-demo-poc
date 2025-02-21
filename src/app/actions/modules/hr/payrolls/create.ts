"use server"

import { FormState } from "@/libs/api/constants";

export const createHRPayroll = async(
  _: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    console.log(formData)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
      status: "success",
      message: "Payroll created successfully"
    }

  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "failed to created payroll";
    
    return {
      status: "error",
      message: message
    }
  }
}
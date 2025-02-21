"use server"

import { FormState } from "@/libs/api/constants"
import { CreateBank } from "@/libs/yup/accounting/banks"

export const createBank = async(
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    const identifierCode = formData.get('identifier_code');

    const body: CreateBank = {
      name: formData.get('name') as string,
      number: formData.get('number') as string,
      identifier_code: identifierCode ? identifierCode as string : null,
    };

    console.log(body)

    return {
      status: "success",
      message: "Success create Bank"
    }
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to create Bank";
    
    return {
      status: "error",
      message
    }
  }
}
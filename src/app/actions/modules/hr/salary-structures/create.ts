"use server"

import { FormState } from "@/libs/api/constants"

export const createSalaryStructure = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => { 
  try {
    console.log(formData);

    return {
      status: 'success',
      message: 'Success create salary structure',
    }
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : 'Error create salary structure';
    
    return {
      status: 'error',
      message
    }
  }
}
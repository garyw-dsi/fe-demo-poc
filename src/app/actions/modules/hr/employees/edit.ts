"use server"

import { FormState } from "@/libs/api/constants"
import { components } from "@/libs/api/schema/uam"

export const updateEmployee = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => { 
  try {
    const body: components['schemas']['UserUpdate'] = {
      first_name: formData.get('first_name') as string,
      last_name: formData.get('last_name') as string,
      group_id: Number(formData.get('group_id') as string),
      is_locked: formData.get('is_locked') === 'true',
    }

    console.log(body);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
      status: "success",
      message: "Employee has been updated successfully"
    }
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "An error occurred while updating employee";

    return {
      status: "error",
      message
    } 
  }
}
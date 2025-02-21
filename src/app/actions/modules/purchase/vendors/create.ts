"use server"

import { FormState } from "@/libs/api/constants"
import { components } from "@/libs/api/schema/core-services"

export const createVendor = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => { 
  try {
    const tags = formData.getAll('tags') as string[]
    const parentId = formData.get('parent_id') 

    const body: components['schemas']['ContactCreate'] = {
      legal_type: formData.get('legal_type') as components['schemas']['ContactLegalType'],
      name: formData.get('name') as string,
      parent_id: parentId ? parseInt(parentId as string) : null,
      tags: tags.map(tag => parseInt(tag)),
      tax_id: formData.get('tax_id') as string,
    }

    console.log(body);

    return {
      status: "success",
      message: "Vendor created successfully",
    }
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "An error occurred while creating the vendor"
    
    return {
      status: "error",
      message
    }
  }
}
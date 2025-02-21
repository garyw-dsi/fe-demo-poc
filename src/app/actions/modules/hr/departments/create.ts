"use server"

import { FormState } from "@/libs/api/constants"

interface CreateDepartment {
  name: string;
  parent_id: number | null;
}

export const createDepartment = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  try {
    const parentId = formData.get("parent_id");

    const body: CreateDepartment = {
      name: formData.get("name") as string,
      parent_id: parentId
        ? Number(parentId)
        :null
    }
    console.log(body)

    return {
      status: "success",
      message: "Department create successfully"
    }
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to create department"
    
    return {
      status: "error",
      message
    }
  }
}
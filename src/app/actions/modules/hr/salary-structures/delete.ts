"use server"

import { FormState } from "@/libs/api/constants"

export const deleteSalaryStructure = async({
  structureId
}: {
  structureId: number
  }): Promise<FormState> => {
  try {
    console.log(`Deleting salary structure with id: ${structureId}`);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
      status: "success",
      message: "Salary Structure has been deleted successfully"
    }
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "An error occurred while deleting Salary Structure";
    
    return {
      status: "error",
      message
    }
  }
}
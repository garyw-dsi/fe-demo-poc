"use server"

import { FormState } from "@/libs/api/constants"

export const deleteEmployee = async({
  employeeId
}: {
  employeeId: number
  }): Promise<FormState> => {
  try {
    console.log(`Deleting employee with id: ${employeeId}`);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
      status: "success",
      message: "Employee has been deleted successfully"
    }
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "An error occurred while deleting employee";
    
    return {
      status: "error",
      message
    }
  }
}
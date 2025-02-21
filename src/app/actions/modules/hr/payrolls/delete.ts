"use server"

import { FormState } from "@/libs/api/constants"

export const deletePayroll = async({
  payrollId
}: {
  payrollId: number
  }): Promise<FormState> => {
  try {
    console.log(`Deleting payroll with id: ${payrollId}`);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
      status: "success",
      message: "Payroll Batch has been deleted successfully"
    }
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "An error occurred while deleting Payroll Batch";
    
    return {
      status: "error",
      message
    }
  }
}
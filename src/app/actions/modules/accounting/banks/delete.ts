"use server"

export const deleteBank = async ({ pk }: { pk: number }) => { 
  try {
    console.log("Deleting bank with pk", pk);
    return {
      status: "success",
      message: "Success delete bank"
    }
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to delete bank";
    
    return {
      status: "error",
      message
    }
  }
}
"use server"

export const deleteRequisition = async ({ pk }: { pk: number }) => { 
  try {
    console.log(`Deleting requisition with pk: ${pk}`);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
      status: "success",
      message: "Requisition has been deleted"
    }
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to delete requisition";
    
    return {
      status: "error",
      message
    }
  }
}
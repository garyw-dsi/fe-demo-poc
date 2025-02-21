"use server"

export const deleteInvoice = async ({ pk }: { pk: number }) => { 
  try {
    console.log(`Deleting invoice with pk: ${pk}`);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
      status: "success",
      message: "Invoice has been deleted"
    }
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to delete invoice";
    
    return {
      status: "error",
      message
    }
  }
}
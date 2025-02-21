"use server"

export const deleteQuotation = async ({ pk }: { pk: number }) => { 
  try {
    console.log(`Deleting quotation with pk: ${pk}`);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
      status: "success",
      message: "Quotation has been deleted"
    }
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to delete order";
    
    return {
      status: "error",
      message
    }
  }
}
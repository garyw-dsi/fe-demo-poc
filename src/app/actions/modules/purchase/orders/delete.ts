"use server"

export const deleteOrder = async ({ pk }: { pk: number }) => { 
  try {
    console.log(`Deleting order with pk: ${pk}`);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
      status: "success",
      message: "Order has been deleted"
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
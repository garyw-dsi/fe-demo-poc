"use server"

export const createInvoiceFromOrder = async ({ orderId }: { orderId: number }) => { 
  try {
    console.log(`Creating invoice from order ${orderId}`);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
      status: "success",
      message: "Invoice successfully created"
    }
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Error while creating invoice";
    
    return {
      status: "error",
      message
    }
  }
}
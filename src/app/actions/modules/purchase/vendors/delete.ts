"use server"

export const deleteVendor = async ({ pk, cid }: { pk: number, cid: number | null }) => {
  try {
    console.log(`Deleting vendor with pk: ${pk} and cid: ${cid}`);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
      status: "success",
      message: "Vendor deleted successfully",
    }
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "An error occurred while deleting the vendor"
    
    return {
      status: "error",
      message
    }
  }
}
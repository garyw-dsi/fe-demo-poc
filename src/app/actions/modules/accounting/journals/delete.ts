"use server"

export const deleteJournal = async ({ pk }: { pk: number }) => {
  try {
    console.log("Deleting journal with pk: ", pk);
    return {
      status: "success",
      message: "Journal deleted successfully"
    }
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to delete journal";
    
    return {
      status: "error",
      message
    }
  }
}
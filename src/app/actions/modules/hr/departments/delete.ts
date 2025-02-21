"use server"

export const deleteDepartment = async ({ pk }: { pk: number }) => { 
  try {
    console.log(`deleting department with pk: ${pk}`)

    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
      status: "success",
      message: "Department deleted successfully"
    }
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "An error occurred while deleting department";

    return {
      status: "error",
      message
    }
  }
}
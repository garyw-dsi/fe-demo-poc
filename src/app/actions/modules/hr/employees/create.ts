"use server"

import { FormState } from "@/libs/api/constants"
import { components } from "@/libs/api/schema/uam";

type DummyCreateEmployee = components['schemas']['UserCreate'];
interface CreateEmployee 
  extends DummyCreateEmployee {
  salary_structure_id: string | null;
  banks: {
    name: string;
    number: string;
  }[] | null
}

export const createEmployee = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => { 
  try {
    const salaryStructureId = formData.get('salary_structure_id') as string;
    const banks = formData.get('banks') as string;

    const body: CreateEmployee = {
      salary_structure_id: salaryStructureId ? salaryStructureId : null,
      banks: banks 
        ? JSON.parse(banks) as CreateEmployee['banks']
        : null,
      email: formData.get('email') as string,
      first_name: formData.get('first_name') as string,
      last_name: formData.get('last_name') as string,
      group_id: Number(formData.get('group_id') as string),
    };

    console.log(body);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
      status: "success",
      message: "Employee has been created successfully"
    }

  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "An error occurred while creating employee";
    
    return {
      status: "error",
      message
    }
  }
}
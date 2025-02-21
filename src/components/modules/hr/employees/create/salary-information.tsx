import { useFormikContext } from "formik";
import { FormControl, Stack } from "@chakra-ui/react";
import { ModuleInputErrorMessage, ModuleInputLabel } from "@/components/modules/input";
import { CreateEmployee } from "@/libs/yup/hr/employees";
import ModuleHREmployeeFormLayout from "../layout";
import ModuleHRSalaryStructureSelect from "../../salary-structures/select";

export default function ModuleHREmployeeSalaryCreate({
  initialSalaryStructures
}: {
  initialSalaryStructures: {
    value: string;
    label: string;
  }[] | undefined;
}) {
  const { errors, touched } = useFormikContext<CreateEmployee>();

  return (
    <ModuleHREmployeeFormLayout title="Salary Information">
      <Stack spacing={5}>
        <FormControl
          isRequired
          isInvalid={!!errors.salary_structure_id && touched.salary_structure_id}
        >
          <ModuleInputLabel label="Salary Structure" />
          <ModuleHRSalaryStructureSelect
            fieldName="salary_structure_id"
            placeholder="Select Salary Structure"
            initialOptions={initialSalaryStructures}
          />
          <ModuleInputErrorMessage value={errors.salary_structure_id} />
        </FormControl>
      </Stack>
    </ModuleHREmployeeFormLayout>
  );
}

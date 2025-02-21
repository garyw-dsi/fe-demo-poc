import { FormControl, Stack } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import { type CreateCustomer } from "@/libs/yup/crm/customers";
import { ModuleInputErrorMessage, ModuleInputLabel } from "@/components/modules/input";

import ModuleCRMCustomerFormLayout from "@/components/modules/crm/customers/layout";
import ModuleCRMIndustryMultiSelect from "@/components/modules/crm/industry/select";

export default function ModuleCRMCustomerIndustryForm() {
  const { errors, touched } = useFormikContext<CreateCustomer>();

  return (
    <ModuleCRMCustomerFormLayout
      title="Customer Industry"
    >
      <Stack spacing={5}>
        <FormControl
          isInvalid={!!errors.industry_type && touched.industry_type}
        >
          <ModuleInputLabel label="Industry Type" />
          <ModuleCRMIndustryMultiSelect fieldName="industry_type" placeholder="Select Industry Type" />
          <ModuleInputErrorMessage value={errors.industry_type} />
        </FormControl>
      </Stack>
    </ModuleCRMCustomerFormLayout>
  )
}
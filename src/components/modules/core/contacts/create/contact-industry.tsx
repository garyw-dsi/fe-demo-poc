import { FormControl, Stack } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import { ModuleInputErrorMessage, ModuleInputLabel } from "@/components/modules/input";

import ModuleContactFormLayout from "@/components/modules/core/contacts/layout";
import ModuleCRMIndustryMultiSelect from "@/components/modules/crm/industry/select";
import { type CreateContact } from "@/libs/yup/core/contacts";

export default function ModuleContactIndustryForm() {
  const { errors, touched } = useFormikContext<CreateContact>();

  return (
    <ModuleContactFormLayout
      title="Contact Industry"
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
    </ModuleContactFormLayout>
  )
}
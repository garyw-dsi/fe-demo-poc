import { FormControl, Stack } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import { type CreateVendor } from "@/libs/yup/purchase/vendors";
import { ModuleInputErrorMessage, ModuleInputLabel } from "@/components/modules/input";

import ModulePurchaseVendorFormLayout from "@/components/modules/purchase/vendors/layout";
import ModuleCRMIndustryMultiSelect from "@/components/modules/crm/industry/select";

export default function ModulePurchaseVendorIndustryForm() {
  const { errors, touched } = useFormikContext<CreateVendor>();

  return (
    <ModulePurchaseVendorFormLayout
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
    </ModulePurchaseVendorFormLayout>
  )
}
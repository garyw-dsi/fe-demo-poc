"use client"

import { Flex, FormControl, Stack } from "@chakra-ui/react"
import ModuleUAMOrganizationFormLayout from "../layout"
import { ModuleInput, ModuleInputErrorMessage, ModuleInputLabel, ModuleInputSelect } from "@/components/modules/input"
import { Field, useFormikContext } from "formik"
import { legalTypes } from "@/constants/modules/organization"
import { Organization } from "@/libs/yup/uam"

export default function ModuleUAMOrganizationInformationEdit({
  organizationPicture
}: {
  organizationPicture: React.ReactNode;
}) {
  const { errors, touched } = useFormikContext<Organization>();
  return (
    <ModuleUAMOrganizationFormLayout
      title="Organization Information"
    ><Flex
      gap={5}
      direction={{ base: 'column', lg: 'row' }}
    >
        {organizationPicture}
        <Stack spacing={5} w={'full'}>
          <FormControl
            isRequired
            isInvalid={!!errors.legal_name && touched.legal_name}
          >
            <ModuleInputLabel label="Legal Name" />
            <Field
              as={ModuleInput}
              name="legal_name"
              placeholder="Legal Name"
            />
            <ModuleInputErrorMessage value={errors.legal_name} />
          </FormControl>

          <FormControl
            isRequired
            isInvalid={!!errors.legal_type && touched.legal_type}
          >
            <ModuleInputLabel label="Legal Type" />
            <Field as={ModuleInputSelect} name="legal_type">
              {legalTypes.map((type) => (
                <option key={type.values} value={type.values}>
                  {type.values}
                </option>
              ))}
            </Field>
            <ModuleInputErrorMessage value={errors.legal_type} />
          </FormControl>
        </Stack>
      </Flex>
    </ModuleUAMOrganizationFormLayout>
  )
}
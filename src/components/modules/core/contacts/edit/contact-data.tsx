"use client"

import ModuleTagSelect from "@/components/modules/core/tags/select";
import { ModuleInput, ModuleInputErrorMessage, ModuleInputLabel, ModuleInputSelect } from "@/components/modules/input";
import { legalTypes } from "@/constants/modules/organization";
import { Center, Flex, FormControl, Stack } from "@chakra-ui/react";
import { Field, useFormikContext } from "formik";

import ModuleCRMCustomerFormLayout from "@/components/modules/crm/customers/layout";
import { type EditContact } from "@/libs/yup/core/contacts";
import { components } from "@/libs/api/schema/core-services";

export default function ModuleContactEditDataForm({
  contact,
  contactImage
}: {
  contact: components['schemas']['Contact'];
  contactImage: React.ReactNode;
}) {
  const { errors, touched } = useFormikContext<EditContact>();

  return (
    <ModuleCRMCustomerFormLayout
      title="Customer Information"
    >
      <Stack spacing={5}>
        <Flex
          gap={5}
          direction={{ base: 'column', lg: 'row' }}
          flexWrap={'wrap'}
        >
          <Center w={'full'}>
            {contactImage}
          </Center>
          <Stack
            spacing={5}
            w={'full'}
          >
            <Flex direction={'column'} gap={5} w={'full'}>
              <FormControl
                isRequired
                isInvalid={!!errors.name && touched.name}
              >
                <ModuleInputLabel label="Customer Name" />
                <Field
                  as={ModuleInput}
                  name="name"
                  placeholder="Customer Name"
                />
                <ModuleInputErrorMessage value={errors.name} />
              </FormControl>
              <FormControl
                isInvalid={!!errors.tags && Boolean(touched.tags)}
              >
                <ModuleInputLabel label="Customer Tags" />
                <ModuleTagSelect
                  placeholder="Select tag"
                  fieldName="tags"
                  defaultValue={
                    contact.tags.map(tag => ({
                      label: tag.name,
                      value: tag.pk.toString()
                    }))
                  }
                />
                <ModuleInputErrorMessage value={errors.tags as string} />
              </FormControl>
            </Flex>
            <Flex direction={'column'} gap={5} w={'full'}>
              <FormControl
                isRequired
                isInvalid={!!errors.legal_type && touched.legal_type}
              >
                <ModuleInputLabel label="Customer Legal Type" />
                <Field
                  as={ModuleInputSelect}
                  name="legal_type"
                  placeholder="Select Legal Type"
                >
                  {legalTypes.map((type) => (
                    <option key={type.values} value={type.values}>
                      {type.values}
                    </option>
                  ))}
                </Field>
                <ModuleInputErrorMessage value={errors.legal_type} />
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!errors.tax_id && touched.tax_id}
              >
                <ModuleInputLabel label="Customer Tax ID" />
                <Field
                  as={ModuleInput}
                  name="tax_id"
                  placeholder="Customer Tax ID"
                />
                <ModuleInputErrorMessage value={errors.tax_id} />
              </FormControl>
            </Flex>
          </Stack>
        </Flex>
      </Stack>
    </ModuleCRMCustomerFormLayout>
  )
}
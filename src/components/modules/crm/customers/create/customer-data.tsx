"use client"

import ModuleTagSelect from "@/components/modules/core/tags/select";
import { ModuleInput, ModuleInputErrorMessage, ModuleInputLabel, ModuleInputSelect } from "@/components/modules/input";
import { legalTypes } from "@/constants/modules/organization";
import { type CreateCustomer } from "@/libs/yup/crm/customers";
import { Button, Flex, FormControl, InputGroup, InputRightElement, Stack } from "@chakra-ui/react";
import { Field, useFormikContext } from "formik";

import ModuleCRMCustomerFormLayout from "@/components/modules/crm/customers/layout";

export default function ModuleCRMCustomerDataForm({
  onChangeName,
  customerImage
}: {
  onChangeName: () => void;
  customerImage: React.ReactNode;
}) {
  const { errors, touched, values } = useFormikContext<CreateCustomer>();

  return (
    <ModuleCRMCustomerFormLayout
      title="Customer Information"
    >
      <Stack spacing={5}>
        <Flex
          gap={5}
          direction={{ base: 'column', lg: 'row' }}
        >
          {customerImage}
          <Flex direction={'column'} gap={5} w={'full'}>
            <FormControl
              isRequired
              isInvalid={!!errors.name && touched.name}
              isReadOnly
            >
              <ModuleInputLabel label="Customer Name" />
              <InputGroup>
                <ModuleInput placeholder="Customer Name" value={values.name} pr={'7.5rem'} />
                <InputRightElement w={'7rem'} mr={1}>
                  <Button
                    h='1.75rem'
                    size='sm'
                    fontSize={'xs'}
                    colorScheme={'gray'}
                    onClick={onChangeName}
                  >
                    Change Name
                  </Button>
                </InputRightElement>
              </InputGroup>
              <ModuleInputErrorMessage value={errors.name} />
            </FormControl>
            <FormControl
              isInvalid={!!errors.tags && Boolean(touched.tags)}
            >
              <ModuleInputLabel label="Customer Tags" />
              <ModuleTagSelect
                placeholder="Select tag"
                fieldName="tags"
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
        </Flex>
      </Stack>
    </ModuleCRMCustomerFormLayout>
  )
}
"use client"

import ModuleTagSelect from "@/components/modules/core/tags/select";
import { ModuleInput, ModuleInputErrorMessage, ModuleInputLabel, ModuleInputSelect } from "@/components/modules/input";
import { legalTypes } from "@/constants/modules/organization";
import { Button, Flex, FormControl, Icon, Stack } from "@chakra-ui/react";
import { Field, useFormikContext } from "formik";

import ModuleContactFormLayout from "@/components/modules/core/contacts/layout";
import { type CreateContact } from "@/libs/yup/core/contacts";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function ModuleContactDataForm({
  customerImage
}: {
  customerImage: React.ReactNode;
}) {
  const { errors, values, touched, setFieldValue, setTouched } = useFormikContext<CreateContact>();

  return (
    <ModuleContactFormLayout
      title="Contact Information"
      action={
        values.is_customer === false
          ? (
            <Button
              size={'sm'}
              fontSize={'xs'}
              leftIcon={
                <Icon as={FaPlus} boxSize={3} />
              }
              onClick={() => {
                setFieldValue('is_customer', true);
                setTouched({ 'is_customer': true });
              }}
            >
              Add to Customer List
            </Button>
          )
          : (
            <Button
              size={'sm'}
              fontSize={'xs'}
              leftIcon={
                <Icon as={FaTrash} boxSize={3} />
              }
              colorScheme="red"
              variant={'outline'}
              onClick={() => {
                setFieldValue('is_customer', false);
                setTouched({ 'is_customer': true });
              }}
            >
              Remove from Customer List
            </Button>
          )
      }
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
            >
              <ModuleInputLabel label="Contact Name" />
              <Field
                as={ModuleInput}
                name="name"
                placeholder="Contact Name"
              />
              <ModuleInputErrorMessage value={errors.name} />
            </FormControl>
            <FormControl
              isInvalid={!!errors.tags && Boolean(touched.tags)}
            >
              <ModuleInputLabel label="Contact Tags" />
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
              <ModuleInputLabel label="Contact Legal Type" />
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
              <ModuleInputLabel label="Contact Tax ID" />
              <Field
                as={ModuleInput}
                name="tax_id"
                placeholder="Contact Tax ID"
              />
              <ModuleInputErrorMessage value={errors.tax_id} />
            </FormControl>
          </Flex>
        </Flex>
      </Stack>
    </ModuleContactFormLayout>
  )
}
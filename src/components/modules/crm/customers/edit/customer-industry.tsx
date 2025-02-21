"use client"

import { Button, Divider, Flex, FormControl, Icon, IconButton, Stack, Text } from "@chakra-ui/react";
import { FieldArray, useFormikContext } from "formik";
import { EditCustomer } from "@/libs/yup/crm/customers";
import ModuleCRMCustomerFormLayout from "@/components/modules/crm/customers/layout";
import { useRef } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { initialEditIndustryValue } from "./form";
import { industryType } from "@/constants/modules/crm";
import { ModuleInputSelect } from "@/components/modules/input";
import { components } from "@/libs/api/schema/core-services";

interface IndustryFieldsProps {
  index: number;
  remove: (index: number) => void;
  setIndustryDeleted: React.Dispatch<React.SetStateAction<number[]>>;
  selectedValues: (components['schemas']['IndustryType'] | string)[];
}

const IndustryFields = ({
  index,
  remove,
  setIndustryDeleted,
  selectedValues,
}: IndustryFieldsProps) => {
  const { values, setFieldValue, setTouched } = useFormikContext<EditCustomer>();

  const onRemove = () => {
    remove(index);

    const industryPk = values.industry?.[index]?.pk;
    if (industryPk) {
      setIndustryDeleted((prev) => [...prev, Number(industryPk)]);
    }
  }

  return (
    <Stack w="full" spacing={4}>
      <Flex justify="space-between" align="center">
        <Flex align="center" gap={5}>
          <IconButton
            aria-label="Remove Industry"
            icon={<Icon as={FaTrash} />}
            size="xs"
            colorScheme="red"
            onClick={onRemove}
          />
          <Text fontSize="sm" fontWeight="bold">
            Industry {index + 1}
          </Text>
        </Flex>
      </Flex>
      <FormControl>
        <ModuleInputSelect
          placeholder="Select Industry"
          value={values.industry?.[index]?.type || ""}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            const { value } = e.target;
            setFieldValue(`industry.${index}.type`, value)
            setTouched({ [`industry.${index}.type`]: true });
          }}
        >
          {industryType.map((industry, idx) => (
            <option
              key={idx}
              value={industry.values}
              disabled={
                selectedValues.includes(industry.values) &&
                values.industry?.[index]?.type !== industry.values
              }
            >
              {industry.values}
            </option>
          ))}
        </ModuleInputSelect>
      </FormControl>
    </Stack>
  )
}

export default function ModuleCRMCustomerEditIndustryForm({
  setIndustryDeleted,
}: {
  setIndustryDeleted: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  const addIndustriesRef = useRef<HTMLButtonElement>(null);
  const { values } = useFormikContext<EditCustomer>();

  const onAddNewIndustries = () => {
    addIndustriesRef.current?.click();
  }

  const selectedValues = values.industry
    ?.map((industry) => industry.type)
    .filter(Boolean) as (components['schemas']['IndustryType'] | string)[];

  return (
    <ModuleCRMCustomerFormLayout
      title="Customer Industry"
      action={
        <Button
          size="sm"
          fontSize="xs"
          leftIcon={<FaPlus />}
          onClick={onAddNewIndustries}
        >
          Add New Industry
        </Button>
      }
    >
      <Stack spacing={4}>
        <FieldArray name="industry">
          {({ push, remove }) => (
            <Stack spacing={5} divider={<Divider />}>
              {values.industry?.map((_, index) => (
                <IndustryFields
                  key={index}
                  index={index}
                  remove={remove}
                  setIndustryDeleted={setIndustryDeleted}
                  selectedValues={selectedValues}
                />
              ))}
              <Button
                display="none"
                ref={addIndustriesRef}
                onClick={() => push(initialEditIndustryValue)}
              />
            </Stack>
          )}
        </FieldArray>
      </Stack>
    </ModuleCRMCustomerFormLayout>
  )
}

"use client";

import { useState, useEffect, useCallback, Fragment } from "react";
import { Button, Icon, useDisclosure } from "@chakra-ui/react";
import debounce from "@/utils/debounce";
import { FaPlus } from "react-icons/fa";
import { useFormikContext } from "formik";

import MultiAsyncSelect from "@/components/select/multi";
import ModalCreateTag from "./create/modal";

import { getTagOptions } from "@/app/actions/modules/core/tags";

interface Option {
  value: string;
  label: string;
}

interface ModuleTagSelectProps {
  fieldName: string;
  placeholder: string;
  defaultValue?: Option[];
}

export default function ModuleTagSelect({
  fieldName,
  placeholder,
  defaultValue = [],
}: Readonly<ModuleTagSelectProps>) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setFieldValue, setTouched, values } = useFormikContext<Record<string, string[]>>();

  const [options, setOptions] = useState<Option[]>(defaultValue);
  const [selectedValues, setSelectedValues] = useState<readonly Option[]>([]);

  useEffect(() => {
    const fieldValues = values[fieldName];
    if (fieldValues) {
      const selected = fieldValues.map((value) => options.find((opt) => opt.value === value)).filter(Boolean);
      setSelectedValues(selected as Option[]);
    }

    /* eslint-disable react-hooks/exhaustive-deps */
  }, [values[fieldName], options]);

  const onCreateTag = ({ value, label }: Option) => {
    const newOption = { value, label };
    const updatedValues = [...(values[fieldName] || []), value];

    setFieldValue(fieldName, updatedValues);
    setOptions((prev) => [...prev, newOption]);
    setSelectedValues((prev) => [...prev, newOption]);
  };

  const fetchOptions = async (inputValue: string): Promise<Option[]> => {
    try {
      const data = await getTagOptions({ name: inputValue });
      
      return data?.map((item) => ({ 
        value: item.pk.toString(), 
        label: item.name 
      })) || [];
    } catch (error) {
      console.error("Failed to fetch tag options:", error);
      return [];
    }
  };

  const loadOptions = useCallback(
    debounce(
      (inputValue: string, callback: (options: Option[]) => void) => {
        fetchOptions(inputValue).then((options) => {
          callback(options);
        });
      }, 500),
    []
  );

  return (
    <Fragment>
      <ModalCreateTag
        isOpen={isOpen}
        onClose={onClose}
        onCreateTag={onCreateTag}
      />

      <MultiAsyncSelect
        isMulti
        isClearable
        value={selectedValues}
        loadOptions={loadOptions}
        onChange={(selectedOptions) => {
          const newValues = selectedOptions?.map((opt) => opt.value) || [];
          setFieldValue(fieldName, newValues);
          setSelectedValues(selectedOptions || []);
        }}
        noOptionsMessage={({ inputValue }) =>
          inputValue ? (
            <Button fontSize="xs" size="sm" leftIcon={<Icon as={FaPlus} boxSize={2} />} onClick={onOpen}>
              Create new Tag
            </Button>
          ) : (
            "Please type Tags carefully"
          )
        }
        onBlur={() => setTouched({ [fieldName]: true })}
        placeholder={placeholder}
      />
    </Fragment>
  )
}

"use client";
/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback } from "react";
import { getCustomerOptions } from "@/app/actions/modules/crm/customers";
import SingleAsyncSelect from "@/components/select";
import debounce from "@/utils/debounce";
import { useFormikContext } from "formik";

interface Option {
  value: string;
  label: string;
}

interface ModuleCRMCustomerSelectProps {
  fieldName: [string, string];
  placeholder: string;
  defaultValue?: Option;
  onSelect?: (id: string, name: string) => void;
}

export default function ModuleCRMCustomerSelect({
  fieldName,
  placeholder,
  defaultValue,
  onSelect
}: Readonly<ModuleCRMCustomerSelectProps>) {
  const { setFieldValue, setTouched } = useFormikContext();

  const getOptions = async (inputValue: string): Promise<Option[]> => {
    try {
      const data = await getCustomerOptions({ name: inputValue });

      return data?.map((item) => ({
        value: item.pk.toString(),
        label: item.name,
      })) || [];
    } catch (error) {
      console.error("Failed to fetch customer options:", error);
      return [];
    }
  };

  const loadOptions = useCallback(
    debounce(
      (inputValue: string, callback: (options: Option[]) => void) => {
        getOptions(inputValue).then((options) => {
          callback(options.length ? options : [{ value: "", label: inputValue }]);
        });
      },
      500
    ), []
  );

  return (
    <SingleAsyncSelect
      isMulti={false}
      isClearable
      defaultValue={defaultValue || null}
      loadOptions={loadOptions}
      onChange={(option) => {
        if (!option) {
          setFieldValue(fieldName[0], "");
          setFieldValue(fieldName[1], "");
          onSelect?.("", "");
        } else {
          setFieldValue(fieldName[0], option.value);
          setFieldValue(fieldName[1], option.label);
          onSelect?.(option.value, option.label);
        }
      }}
      noOptionsMessage={() => "Please type Customer name carefully"}
      onBlur={() => {
        setTouched({
          [fieldName[0]]: true,
          [fieldName[1]]: true,
        });
      }}
      placeholder={placeholder}
    />
  );
}

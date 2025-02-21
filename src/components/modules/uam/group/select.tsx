/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCallback } from "react";
import { useFormikContext } from "formik";
import { getGroupOptions } from "@/app/actions/modules/uam/groups";
import SingleAsyncSelect from "@/components/select";
import debounce from "@/utils/debounce";

interface Option {
  value: string;
  label: string;
}

export default function UAMGroupSelect({
  fieldName,
  defaultValue,
  initialOptions,
  placeholder,
}: Readonly<{
  fieldName: string;
  defaultValue?: Option;
  initialOptions?: Option[];
  placeholder?: string;
}>) {
  const { setFieldValue, setTouched } = useFormikContext();

  const getOptions = async (inputValue: string): Promise<Option[]> => {
    const { data } = await getGroupOptions({ name: inputValue });

    const items = data?.map((item) => {
      return {
        value: item.pk.toString(),
        label: item.name,
      };
    });

    return items || [];
  };

  const loadOptions = useCallback(
    debounce(
      (inputValue: string, callback: (options: Option[]) => void) => {
        getOptions(inputValue).then((options) => {
          callback(options);
        });
      }, 500),
    []
  );

  return (
    <SingleAsyncSelect
      isMulti={false}
      isClearable
      cacheOptions
      defaultOptions={initialOptions}
      loadOptions={loadOptions}
      onChange={(option) => {
        setFieldValue(fieldName, option?.value)
      }}
      defaultValue={defaultValue}
      noOptionsMessage={
        (obj: { inputValue: string }) => {
          return obj.inputValue === ""
            ? "Please type a group name"
            : "No group found";
        }
      }
      onBlur={() => {
        setTouched({ [fieldName]: true });
      }}
      placeholder={placeholder || "Search Parent Group"}
    />
  )
}

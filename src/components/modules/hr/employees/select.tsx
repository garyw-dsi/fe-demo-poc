"use client";
/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback } from "react";
import SingleAsyncSelect from "@/components/select";
import debounce from "@/utils/debounce";
import { useFormikContext } from "formik";
import { getEmployeeOptions } from "@/app/actions/modules/hr/employees/read";

interface Option {
  value: string;
  label: string;
}

export default function ModuleHREmployeeSelect({
  fieldName,
  placeholder,
  defaultValue,
  initialValue
}: Readonly<{
  fieldName: string;
  placeholder: string;
  defaultValue?: Option;
  initialValue?: Option[];
}>) {
  const { setFieldValue, setTouched } = useFormikContext();

  const getOptions = async (inputValue: string): Promise<Option[]> => {
    const { data } = await getEmployeeOptions({ employeeName: inputValue });

    const items = {
      value: data?.name || "",
      label: data?.name || "",
    }

    return [items];
  };

  const loadOptions = useCallback(
    debounce(
      (inputValue: string, callback: (options: Option[]) => void) => {
        getOptions(inputValue).then((options) => {
          callback(options);
        });
      },
      500
    ), []);

  return (
    <SingleAsyncSelect
      isMulti={false}
      isClearable
      cacheOptions={true}
      defaultOptions={initialValue}
      defaultValue={defaultValue}
      loadOptions={loadOptions}
      onChange={(option) => {
        setFieldValue(fieldName, option?.value);
      }}
      noOptionsMessage={() => "Please type Employee Name carefully"}
      onBlur={() => {
        setTouched(fieldName, true);
      }}
      placeholder={placeholder}
    />
  );
}

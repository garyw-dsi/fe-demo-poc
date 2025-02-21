/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCallback } from "react";
import { useFormikContext } from "formik";
import SingleAsyncSelect from "@/components/select";
import debounce from "@/utils/debounce";
import { getCustomerOptions } from "@/app/actions/modules/crm/customers";

interface Option {
  value: string;
  label: string;
}

export default function ModulePurchaseVendorSelect({
  fieldName,
  defaultValue,
  placeholder
}: Readonly<{
  fieldName: string;
  defaultValue?: Option;
  placeholder: string;
}>) {
  const { setFieldValue, setTouched } = useFormikContext();

  const getOptions = async (inputValue: string): Promise<Option[]> => {
    const data = await getCustomerOptions({ name: inputValue });

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
      loadOptions={loadOptions}
      onChange={(option) => {
        setFieldValue(fieldName, option?.value)
      }}
      defaultValue={defaultValue}
      noOptionsMessage={
        (obj: { inputValue: string }) => {
          return obj.inputValue === ""
            ? "Please type vendor name"
            : "No vendor found";
        }
      }
      onBlur={() => {
        setTouched({ [fieldName]: true });
      }}
      placeholder={placeholder}
    />
  )
}

/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCallback } from "react";
import { useFormikContext } from "formik";
import SingleAsyncSelect from "@/components/select";
import debounce from "@/utils/debounce";
import { getAccountOptions } from "@/app/actions/modules/accounting/accounts";
import { components } from "@/libs/api/schema/accounting";

interface Option {
  value: string;
  label: string;
}

export default function ModuleAccountingAccountSelect({
  fieldName,
  defaultValue,
  initialOptions,
  placeholder,
  onSelect
}: Readonly<{
  fieldName: string;
  defaultValue?: Option;
  initialOptions?: Option[];
  placeholder?: string;
  onSelect?: (option: components['schemas']['AccountOpt']) => void;
}>) {
  const { setFieldValue, setTouched } = useFormikContext();

  const getOptions = async (inputValue: string): Promise<Option[]> => {
    const { data } = await getAccountOptions({ name: inputValue });

    const items = data?.map((item) => {
      return {
        value: item.pk.toString(),
        label: item.name,
        ...item
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
        if (onSelect && option) {
          onSelect(option as unknown as components['schemas']['AccountOpt'])
        }
      }}
      defaultValue={defaultValue}
      noOptionsMessage={
        (obj: { inputValue: string }) => {
          return obj.inputValue === ""
            ? "Please type account name"
            : "No account found";
        }
      }
      onBlur={() => {
        setTouched({ [fieldName]: true });
      }}
      placeholder={placeholder || "Select Account Name"}
    />
  )
}

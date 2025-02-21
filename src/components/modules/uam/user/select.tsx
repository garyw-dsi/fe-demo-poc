/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { getUserOptionsByEmail } from "@/app/actions/modules/uam/users";
import debounce from "@/utils/debounce";
import { useCallback } from "react";
import { useFormikContext } from "formik";
import SingleAsyncSelect from "@/components/select";

interface Option {
  value: string;
  label: string;
}

export default function UAMUserSelectByEmail({
  fieldName,
  placeholder,
  defaultValue
}: Readonly<{
  fieldName: string;
  placeholder: string;
  defaultValue?: Option;
}>) {
  const { setFieldValue, setTouched } = useFormikContext();

  const getOptions = async (inputValue: string): Promise<Option[]> => {
    const data = await getUserOptionsByEmail({ email: inputValue });

    const items = data?.map((item) => {
      return {
        value: item.pk.toString(),
        label: `
          ${item.email} | ${item.first_name} ${item.last_name}
            `
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
            ? "Please type user carefully"
            : "No user found";
        }
      }
      onBlur={() => {
        setTouched({ [fieldName]: true });
      }}
      placeholder={placeholder}
    />
  )
}

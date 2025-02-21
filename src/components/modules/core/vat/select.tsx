/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCallback } from "react";
import { useFormikContext } from "formik";
import SingleAsyncSelect from "@/components/select";
import debounce from "@/utils/debounce";
import { getVatOptions } from "@/app/actions/modules/core/vat";
import { components } from "@/libs/api/schema/core-services";

interface Option {
  value: string;
  label: string;
  other?: components["schemas"]["VATOpt"];
}

export default function ModuleVATSelect({
  fieldName,
  placeholder,
  defaultValue,
  initialOptions,
  onVATSelect,
}: Readonly<{
  fieldName: string;
  placeholder: string;
  defaultValue?: Option | undefined;
  initialOptions?: Omit<Option, "other">[] | undefined;
  onVATSelect?: (option: Option | null) => void;
}>) {
  const { setFieldValue, setTouched } = useFormikContext();

  const getOptions = async (inputValue: string): Promise<Option[]> => {
    const { data } = await getVatOptions({ name: inputValue });

    return (
      data?.items.map((item) => ({
        value: item.pk.toString(),
        label: item.name,
        other: item,
      })) || []
    );
  };

  const loadOptions = useCallback(
    debounce(
      (inputValue: string, callback: (options: Option[]) => void) => {
        getOptions(inputValue).then(callback);
      },
      500),
    []
  );

  return (
    <SingleAsyncSelect
      isMulti={false}
      isClearable
      loadOptions={loadOptions}
      defaultOptions={initialOptions}
      onChange={(option) => {
        setFieldValue(fieldName, option?.value || "");
        if (onVATSelect) {
          onVATSelect(option || null);
        }
      }}
      defaultValue={defaultValue}
      noOptionsMessage={({ inputValue }) =>
        inputValue === ""
          ? "Please type vat"
          : "No vat found"
      }
      onBlur={() => {
        setTouched({ [fieldName]: true });
      }}
      placeholder={placeholder}
    />
  )
}

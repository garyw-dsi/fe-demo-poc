/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCallback } from "react";
import { useFormikContext } from "formik";
import SingleAsyncSelect from "@/components/select";
import debounce from "@/utils/debounce";
import { getProductOptions } from "@/app/actions/modules/inventory/products";
import { components } from "@/libs/api/schema/inventory";

interface Option {
  value: string;
  label: string;
  other: components["schemas"]["ProductOpt"];
}

export default function ModuleInventoryProductSelect({
  fieldName,
  placeholder,
  defaultValue,
  onProductSelect,
}: Readonly<{
  fieldName: string;
  placeholder: string;
  defaultValue?: Option | undefined;
  onProductSelect?: (product: Option | null) => void;
}>) {
  const { setFieldValue, setTouched } = useFormikContext();

  const getOptions = async (inputValue: string): Promise<Option[]> => {
    const data = await getProductOptions({ name: inputValue });

    return (
      data?.map((item) => ({
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
      onChange={(option) => {
        if (option) {
          if (Number(option.other.stock) <= 0) return null;

          setFieldValue(fieldName, option?.value || "");
          if (onProductSelect) {
            onProductSelect(option || null);
          }
        }
      }}
      defaultValue={defaultValue}
      noOptionsMessage={({ inputValue }) =>
        inputValue === ""
          ? "Please type a product name"
          : "No product found"
      }
      onBlur={() => {
        setTouched({ [fieldName]: true });
      }}
      placeholder={placeholder}
    />
  )
}

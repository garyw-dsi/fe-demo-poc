/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCallback } from "react";
import { useFormikContext } from "formik";
import SingleAsyncSelect from "@/components/select";
import debounce from "@/utils/debounce";
import { getCustomerOptions } from "@/app/actions/modules/crm/customers";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Option {
  value: string;
  label: string;
}

export default function ModuleSalesCustomerSelect({
  fieldName,
  defaultValue,
  placeholder,
  initialOptions,
}: Readonly<{
  fieldName: string;
  defaultValue?: Option;
  placeholder: string;
  initialOptions?: Option[] | undefined;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

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
    <SingleAsyncSelect key={defaultValue?.value}
      isMulti={false}
      isClearable
      loadOptions={loadOptions}
      defaultOptions={initialOptions}
      onChange={(option) => {
        setFieldValue(fieldName, option?.value)
        const searchParams = new URLSearchParams(params);

        if (!option?.value || !option?.label) {
          setFieldValue("lead_id", null);

          searchParams.delete("customer_id");
          router.push(`${pathname}?${searchParams.toString()}`);
          return;
        }

        searchParams.set("customer_id", option?.value || "");
        router.push(`${pathname}?${searchParams.toString()}`);
      }}
      defaultValue={defaultValue}
      noOptionsMessage={
        (obj: { inputValue: string }) => {
          return obj.inputValue === ""
            ? "Please type customer name"
            : "No customer found";
        }
      }
      onBlur={() => {
        setTouched({ [fieldName]: true });
      }}
      placeholder={placeholder}
    />
  )
}

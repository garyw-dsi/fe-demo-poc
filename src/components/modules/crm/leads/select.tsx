/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCallback } from "react";
import { useFormikContext } from "formik";
import SingleAsyncSelect from "@/components/select";
import debounce from "@/utils/debounce";
import { getLeadOptions } from "@/app/actions/modules/crm/leads";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { components } from "@/libs/api/schema/crm";

interface Option {
  value: string;
  label: string;
  other?: components['schemas']['LeadOpt'] | undefined
}

export default function ModuleCRMSalesSelect({
  fieldName,
  defaultValue,
  initialOptions,
  placeholder
}: Readonly<{
  fieldName: string;
  defaultValue?: Option;
  initialOptions?: Option[];
  placeholder: string;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const customer_id = params.get("customer_id") || undefined;

  const { setFieldValue, setTouched } = useFormikContext();

  const getOptions = async (inputValue: string): Promise<Option[]> => {
    const data = await getLeadOptions({ name: inputValue, customer_id });

    const items = data?.map((item) => {
      return {
        value: item.pk.toString(),
        label: item.name,
        other: item
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
      defaultOptions={initialOptions}
      onChange={(option) => {
        const searchParams = new URLSearchParams(params);

        if (option?.value) {
          const customerId = option.other?.customer?.pk
          const leadId = option.value

          setFieldValue("customer_id", customerId)
          setFieldValue(fieldName, leadId)

          searchParams.set("customer_id", customerId?.toString() as string);
          searchParams.set("lead_id", leadId);

          router.push(`${pathname}?${searchParams.toString()}`);
        }

        if (!option?.value || !option?.label) {
          setFieldValue(fieldName, null)
          setFieldValue("customer_id", null)

          searchParams.delete("customer_id");
          searchParams.delete("lead_id");
          router.push(`${pathname}?${searchParams.toString()}`);
        }
      }}
      defaultValue={defaultValue}
      noOptionsMessage={
        (obj: { inputValue: string }) => {
          return obj.inputValue === ""
            ? "Please type lead name"
            : "No lead found";
        }
      }
      onBlur={() => {
        setTouched({ [fieldName]: true });
      }}
      placeholder={placeholder}
    />
  )
}

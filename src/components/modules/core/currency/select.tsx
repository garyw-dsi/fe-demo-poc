"use client"

import { Fragment } from "react";
import { useFormikContext } from "formik";
import SingleStaticSelect from "@/components/select/static-single";

interface Option {
  value: string;
  label: string;
}

export default function ModuleCurrencySelect({
  defaultValues,
  fieldName,
  placeholder,
  datas
}: Readonly<{
  defaultValues?: Option;
  fieldName: string;
  placeholder: string;
  datas: Option[] | undefined;
}>) {
  const { setFieldValue, setTouched } = useFormikContext();

  return (
    <Fragment>
      <SingleStaticSelect
        isMulti={false}
        defaultValue={defaultValues}
        options={datas?.map((data) => ({
          label: data.label,
          value: data.value
        }))}
        isClearable
        onChange={(option) => {
          setFieldValue(fieldName, option?.value)
        }}
        noOptionsMessage={
          (obj: { inputValue: string }) => {
            return obj.inputValue === ""
              && "Please input currency carefully"
          }
        }
        onBlur={() => {
          setTouched({ [fieldName]: true });
        }}
        placeholder={placeholder}
      />
    </Fragment>
  )
}
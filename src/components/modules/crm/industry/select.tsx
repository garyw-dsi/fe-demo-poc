"use client"

import { Fragment } from "react";
import { useFormikContext } from "formik";
import MultiStaticSelect from "@/components/select/static-multi";
import { industryType } from "@/constants/modules/crm";

interface Option {
  value: string;
  label: string;
}

export default function ModuleCRMIndustryMultiSelect({
  fieldName,
  placeholder,
  defaultValue
}: Readonly<{
  fieldName: string;
  placeholder: string;
  defaultValue?: Option[];
}>) {
  const { setFieldValue, setTouched } = useFormikContext();

  return (
    <Fragment>
      <MultiStaticSelect
        isMulti={true}
        options={industryType.map((industry) => ({
          value: industry.values,
          label: industry.values
        }))}
        isClearable
        defaultValue={defaultValue}
        onChange={(option) => {
          setFieldValue(
            fieldName,
            option?.map((opt) => opt.value)
          )
        }}
        noOptionsMessage={
          (obj: { inputValue: string }) => {
            return obj.inputValue === ""
              && "Please input industry carefully"
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
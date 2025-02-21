"use client";

import { useCallback, useEffect, useState } from "react";
import { getTagOptions } from "@/app/actions/modules/core/tags";
import SingleAsyncSelect from "@/components/select";
import debounce from "@/utils/debounce";

interface Option {
  value: string;
  label: string;
}

interface TagFilterProps {
  placeholder: string;
  defaultValue?: Option;
  onChange: (value?: string) => void;
}

export default function TagFilter({
  placeholder,
  defaultValue,
  onChange,
}: Readonly<TagFilterProps>) {
  const [selectedValue, setSelectedValue] = useState<Option | null>(null);

  const getOptions = async (inputValue: string): Promise<Option[]> => {
    try {
      const data = await getTagOptions({ name: inputValue });
      return data?.map((item) => ({
        value: item.pk.toString(),
        label: item.name,
      })) || [];
    } catch (error) {
      console.error("Failed to fetch tag options:", error);
      return [];
    }
  };

  const loadOptions = useCallback(
    debounce(
      (inputValue: string, callback: (options: Option[]) => void) => {
        getOptions(inputValue).then((options) => {
          callback(options.length ? options : []);
        });
      },
      500
    ), []
  );

  useEffect(() => {
    const loadInitialTag = async () => {
      if (defaultValue?.value) {
        const options = await getOptions("");
        const selectedOption = options.find(opt => opt.value === defaultValue.value);
        if (selectedOption) {
          setSelectedValue(selectedOption);
        }
      } else {
        setSelectedValue(null);
      }
    };

    loadInitialTag();
  }, [defaultValue?.value]);

  return (
    <SingleAsyncSelect
      isMulti={false}
      isClearable
      value={selectedValue}
      loadOptions={loadOptions}
      onChange={(option) => {
        onChange(option?.value);
        setSelectedValue(option);
      }}
      noOptionsMessage={() => "Please type Tag name carefully"}
      placeholder={placeholder}
      menuPosition="absolute"
    />
  );
}

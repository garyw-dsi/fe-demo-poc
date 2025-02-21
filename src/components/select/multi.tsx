import AsyncSelect, { AsyncProps } from "react-select/async";
import { GroupBase } from "react-select";
import { useColorModeValue } from "@chakra-ui/react";

export interface OptionType {
  value: string;
  label: string;
}

export default function MultiAsyncSelect<
  Option extends OptionType,
  IsMulti extends boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: AsyncProps<Option, IsMulti, Group>
) {
  const textColor = useColorModeValue('black', 'white');
  const menuBg = useColorModeValue('white', '#1A202C');
  const hoverOption = useColorModeValue('#1a55e3', '#1a55e3');
  const bgSelected = useColorModeValue('#1a55e3', '#1a55e3');
  const bgBorder = useColorModeValue('#D1D5DB', '#718096');

  return (
    <AsyncSelect
      instanceId={'select-multi'}
      styles={{
        menuPortal: provided => ({
          ...provided,
          zIndex: 99,
          fontSize: '12px',
        }),
        menu: provided => ({
          ...provided,
          zIndex: 99,
          fontSize: '12px',
          backgroundColor: menuBg,
        }),
        option: (baseStyles, { isSelected }) => ({
          ...baseStyles,
          color: isSelected ? 'white' : textColor,
          backgroundColor: isSelected ? bgSelected : 'none',
          '&:hover': {
            backgroundColor: hoverOption,
          },
        }),
        multiValueLabel: (base) => ({
          ...base,
          color: "white",
          fontSize: '11px',
        }),
        multiValue(base) {
          return {
            ...base,
            borderRadius: '5px',
            marginRight: '5px',
            color: "white",
            fontSize: '11px',
            backgroundColor: bgSelected,
          };
        },
        input: (baseStyles) => ({
          ...baseStyles,
          color: textColor,
          fontSize: '12px',
        }),
        control: (baseStyles) => ({
          ...baseStyles,
          borderColor: bgBorder,
          borderRadius: '7px',
          padding: '0.1rem 0.5rem',
          backgroundColor: 'none',
        }),
        placeholder: (baseStyles) => ({
          ...baseStyles,
          fontSize: '12px',
        }),
      }}
      menuPosition={'fixed'}
      {...props}
    />
  )
}
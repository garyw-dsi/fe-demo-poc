import { Box, useCheckbox, UseCheckboxProps, useColorModeValue } from "@chakra-ui/react";

interface CustomCheckboxProps
  extends UseCheckboxProps {
  children: React.ReactNode;
}

export default function ModuleUAMGroupSetPermissionCheckbox({
  children,
  ...props
}: CustomCheckboxProps) {
  const { getInputProps, getCheckboxProps } = useCheckbox(props);

  const inputProps = getInputProps();
  const checkboxProps = getCheckboxProps();

  return (
    <Box as="label">
      <input {...inputProps} />
      <Box
        {...checkboxProps}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        _checked={{
          bg: "blue.500",
          color: "white",
          borderColor: "blue.500",
        }}
        _hover={{
          _checked: {
            bg: "blue.600",
            borderColor: "blue.600",
          },
          bg: useColorModeValue("gray.200", "gray.700"),
        }}
        p={2}
        fontSize={'xs'}
      >
        {children}
      </Box>
    </Box>
  )
}
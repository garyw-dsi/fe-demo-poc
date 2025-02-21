import { FormErrorMessage, FormHelperText, FormLabel, Input, InputProps, Select, SelectProps } from "@chakra-ui/react"

export const ModuleInputLabel = ({ label }: { label: string }) => {
  return (
    <FormLabel
      fontSize={{ base: 'sm', md: 'xs' }}
    >
      {label}
    </FormLabel>
  )
}

export const ModuleInputHelper = ({ helper }: { helper: string }) => {
  return (
    <FormHelperText
      fontSize={{ base: "sm", md: 'xs' }}
    >
      {helper}
    </FormHelperText>
  )
}

export const ModuleInputErrorMessage = ({ value }: { value: string | undefined }) => {
  return (
    <FormErrorMessage
      fontSize={{ base: 'sm', md: 'xs' }}
    >
      {value}
    </FormErrorMessage>
  )
}

export const ModuleInput = ({ ...props }: InputProps) => {
  return (
    <Input
      variant="outline"
      fontSize={{ md: 'xs' }}
      {...props}
    />
  )
}

export const ModuleInputSelect = ({ ...props }: SelectProps) => {
  return (
    <Select
      variant="outline"
      fontSize={{ md: 'xs' }}
      {...props}
    />
  )
}
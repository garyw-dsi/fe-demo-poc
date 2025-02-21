import { Button, FormErrorMessage, FormLabel, Icon, Input, InputGroup, InputProps, InputRightElement } from "@chakra-ui/react"
import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"

export const AuthInput = ({ ...props }: InputProps) => {
  return (
    <Input
      variant="outline"
      fontSize={{ md: 'xs' }}
      h={{ base: 10, md: 8 }}
      {...props}
    />
  )
}

export const AuthInputPassword = ({ ...props }: InputProps) => {
  const [show, setShow] = useState<boolean>(false);
  const onShow = () => setShow(!show);

  return (
    <InputGroup>
      <Input
        variant="outline" fontSize={{ md: 'xs' }}
        h={{ base: 10, md: 8 }}
        type={show ? 'text' : 'password'}
        pr='3rem'
        {...props}
      />
      <InputRightElement width='3rem' mt={{ md: "-0.25rem" }}>
        <Button
          h={{ base: 8, md: 6 }}
          size="sm"
          onClick={onShow}
        >
          {show
            ? <Icon as={FaEyeSlash} />
            : <Icon as={FaEye} />
          }
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}

export const AuthInputLabel = ({ label }: { label: string }) => {
  return (
    <FormLabel
      fontSize={{ base: 'sm', md: 'xs' }}
    >
      {label}
    </FormLabel>
  )
}

export const AuthInputErrorMessage = ({ value }: { value: string | undefined }) => {
  return (
    <FormErrorMessage
      fontSize={{ base: 'sm', md: 'xs' }}
    >
      {value}
    </FormErrorMessage>
  )
}
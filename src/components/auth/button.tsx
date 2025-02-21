import { Button, ButtonProps } from "@chakra-ui/react";

export const AuthPrimaryButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      colorScheme="blue"
      w={'full'}
      size={{ base: 'md', md: 'sm' }}
      fontSize={'sm'}
      {...props}
    >
      {children}
    </Button>
  )
}

export const AuthLinkButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      colorScheme="blue"
      variant={'link'}
      fontSize={{ base: 'sm', md: 'xs' }}
      {...props}
    >
      {children}
    </Button>
  )
}
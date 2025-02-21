import { Button, ButtonProps } from "@chakra-ui/react";

export const ButtonSteps = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      fontSize={{ base: 'sm', md: 'xs' }}
      size={{ base: 'md', md: 'sm' }}
      w={{ base: "full", md: "fit-content" }}
      {...props}
    >
      {children}
    </Button>
  )
}

import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/react";

export default function UserVerificationSuccess({
  message
}: {
  message: string
}) {
  return (
    <Alert
      status='success'
      variant='subtle'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      rounded={'lg'}
      py={8}
    >
      <AlertIcon boxSize='40px' mr={0} />
      <AlertTitle mt={4} mb={1} fontSize='lg'>
        {message}
      </AlertTitle>
      <AlertDescription maxWidth='sm'>
        Your verification is successful. You can sign in using your credentials now.
        you can close this tab now.
      </AlertDescription>
    </Alert>
  )
}
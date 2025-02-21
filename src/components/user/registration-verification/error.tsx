import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/react"

export default function UserVerificationError({
  message
}: {
  message: string
}) {
  return (
    <Alert
      status='error'
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
      <AlertDescription maxWidth='sm' pt={5}>
        It looks like the token is invalid or expired. Please try again.
        you can close this tab now.
      </AlertDescription>
    </Alert>
  )
}
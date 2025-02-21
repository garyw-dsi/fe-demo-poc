import { Button, Flex } from "@chakra-ui/react";
import { useFormStatus } from "react-dom";

export default function SetPermissionSubmit() {
  const { pending } = useFormStatus();

  return (
    <Flex justify={'start'}>
      <Button type="submit"
        colorScheme="blue"
        fontSize={'xs'}
        size={'sm'}
        isLoading={pending}
        loadingText="Saving permissions..."
      >
        Save Permissions
      </Button>
    </Flex >
  )
}
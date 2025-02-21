import { Button, Flex } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import { useFormStatus } from "react-dom";

export default function TransferMaintainerOrgSubmit() {
  const { errors, touched } = useFormikContext();
  const { pending } = useFormStatus();

  return (
    <Flex justify={'start'}>
      <Button type="submit"
        colorScheme="blue"
        fontSize={'xs'}
        size={'sm'}
        isLoading={pending}
        loadingText="Transfering Maintainer..."
        isDisabled={
          Object.keys(errors).length > 0 ||
          Object.keys(touched).length === 0
        }
      >
        Save Data
      </Button>
    </Flex>
  )
}
import { Button, Flex } from "@chakra-ui/react";
import { useFormStatus } from "react-dom";

export default function ModalSendQuotationButton() {
  const { pending } = useFormStatus();

  return (
    <Flex gap={2} align={'center'} w={'full'}>
      <Button type="reset"
        size={'sm'}
        fontSize={'xs'}
        w={'full'}
        colorScheme="red"
        variant={'ghost'}
        isDisabled={pending}
      >
        Close
      </Button>
      <Button type="submit"
        size={'sm'}
        fontSize={'xs'}
        w={'full'}
        colorScheme="blue"
        isLoading={pending}
        loadingText="sending mail..."
      >
        Submit
      </Button>
    </Flex>
  )
}
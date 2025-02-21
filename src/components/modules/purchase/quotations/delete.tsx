import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { deleteQuotation } from "@/app/actions/modules/purchase/quotations";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  pk: number;
}

export default function ModulePurchaseQuotationDelete({
  isOpen,
  onClose,
  pk
}: Props) {
  const toast = useToast();
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const onDelete = async () => {
    try {
      setIsDeleting(true);

      const response = await deleteQuotation({ pk });

      if (response.status === "success") {
        router.replace("/modules/purchase/quotations");

        return toast({
          title: "Quotation Deleted",
          description: response.message as string,
          status: "success",
        })
      }
      throw new Error(response.message as string);
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : "Error while deleting order";

      return toast({
        title: "Failed to delete quotation",
        description: message,
        status: "error",
      })
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          fontSize={{ base: 'lg', md: 'lg' }}
        >
          Delete Quotation
        </ModalHeader>
        <ModalBody
          fontSize={{ base: 'sm', md: 'xs' }}
        >
          Are you sure want to delete this Quotation?
        </ModalBody>
        <ModalFooter gap={3}>
          <Button
            size={'sm'}
            fontSize={'xs'}
            onClick={onClose}
            isDisabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            colorScheme={'red'}
            size={'sm'}
            fontSize={'xs'}
            onClick={onDelete}
            isLoading={isDeleting}
            loadingText="deleting..."
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
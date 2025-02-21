import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { deleteInvoice } from "@/app/actions/modules/purchase/invoices";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  pk: number;
}

export default function ModulePurchaseInvoiceDelete({
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

      const response = await deleteInvoice({ pk });

      if (response.status === "success") {
        router.replace("/modules/purchase/invoices");

        return toast({
          title: "Invoice Deleted",
          description: response.message as string,
          status: "success",
        })
      }
      throw new Error(response.message as string);
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : "Error while deleting invoice";

      return toast({
        title: "Failed to delete invoice",
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
          Delete Invoice
        </ModalHeader>
        <ModalBody
          fontSize={{ base: 'sm', md: 'xs' }}
        >
          Are you sure want to delete this Invoice?
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
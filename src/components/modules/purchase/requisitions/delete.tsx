import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { deleteRequisition } from "@/app/actions/modules/purchase/requisitions";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  pk: number;
}

export default function ModulePurchaseRequisitionDelete({
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

      const response = await deleteRequisition({ pk });

      if (response.status === "success") {
        router.replace("/modules/purchase/requisitions");

        return toast({
          title: "Requisition Deleted",
          description: response.message as string,
          status: "success",
        })
      }
      throw new Error(response.message as string);
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : "Error while deleting requisition";

      return toast({
        title: "Failed to delete requisition",
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
          Delete Requisition
        </ModalHeader>
        <ModalBody
          fontSize={{ base: 'sm', md: 'xs' }}
        >
          Are you sure want to delete this Requisition?
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { deleteContact } from "@/app/actions/modules/core/contacts";

interface ModuleCRMLeadProps {
  isOpen: boolean;
  onClose: () => void;
  pk: number;
}

export default function ModuleContactDelete({
  isOpen,
  onClose,
  pk
}: ModuleCRMLeadProps) {
  const toast = useToast();
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const onDelete = async () => {
    try {
      setIsDeleting(true);

      const response = await deleteContact({ contactId: pk });

      if (response.status === "success") {
        router.replace("/modules/core/contacts");

        return toast({
          title: "Contact Deleted",
          description: response.message as string,
          status: "success",
        })
      }
      return toast({
        title: "Failed to delete contact",
        description: response.message as string,
        status: "error",
      })
    } catch {
      return toast({
        title: "Failed to delete contact",
        description: "Error while deleting lead",
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
          Delete Contact
        </ModalHeader>
        <ModalBody
          fontSize={{ base: 'sm', md: 'xs' }}
        >
          Are you sure want to delete this Contact?
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
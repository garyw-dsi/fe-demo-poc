import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { deleteLead } from "@/app/actions/modules/crm/leads";

interface ModuleCRMLeadProps {
  isOpen: boolean;
  onClose: () => void;
  pk: number;
}

export default function ModuleCRMLeadDelete({
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

      const response = await deleteLead({ leadId: pk });

      if (response.status === "success") {
        router.replace("/modules/crm/leads");

        return toast({
          title: "Lead Deleted",
          description: response.message as string,
          status: "success",
        })
      }
      return toast({
        title: "Failed to delete lead",
        description: response.message as string,
        status: "error",
      })
    } catch {
      return toast({
        title: "Failed to delete lead",
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
          Delete Lead
        </ModalHeader>
        <ModalBody
          fontSize={{ base: 'sm', md: 'xs' }}
        >
          Are you sure want to delete this Lead?
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
import { deleteGroup } from "@/app/actions/modules/uam/groups";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ModuleUAMGroupDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  pk: number;
}

export default function ModuleUAMGroupDelete({
  isOpen,
  onClose,
  pk
}: ModuleUAMGroupDeleteProps) {
  const toast = useToast();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const onDelete = async () => {
    try {
      setIsDeleting(true);

      const response = await deleteGroup({ pk });
      if (response.status === "success") {
        router.replace("/modules/uam/groups");

        return toast({
          title: "Group Deleted",
          description: "Group has been deleted successfully.",
          status: "success",
        })
      }
      return toast({
        title: "Failed to delete group",
        description: response.message as string,
        status: "error",
      })
    } catch {
      return toast({
        title: "Failed to delete group",
        description: "Error while deleting group",
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
          Delete Group
        </ModalHeader>
        <ModalBody
          fontSize={{ base: 'sm', md: 'xs' }}
        >
          Are you sure want to delete this group?
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
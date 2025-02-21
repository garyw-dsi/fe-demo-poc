import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { deleteDepartment } from "@/app/actions/modules/hr/departments";

interface ModuleUAMUserDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  pk: number;
}

export default function ModuleHRDepartmentDelete({
  isOpen,
  onClose,
  pk
}: ModuleUAMUserDeleteProps) {
  const toast = useToast();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const onDelete = async () => {
    try {
      setIsDeleting(true);

      const response = await deleteDepartment({ pk });

      if (response.status === "success") {
        router.replace("/modules/hr/departments");

        return toast({
          title: "Department Deleted",
          description: "Department has been deleted successfully.",
          status: "success",
        })
      }
      throw new Error(response.message as string);

    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : "Error while deleting department";

      return toast({
        title: "Failed to delete department",
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
          Delete Department
        </ModalHeader>
        <ModalBody
          fontSize={{ base: 'sm', md: 'xs' }}
        >
          Are you sure want to delete this Department?
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
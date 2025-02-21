import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { deleteEmployee } from "@/app/actions/modules/hr/employees";

interface ModuleUAMUserDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  pk: number;
}

export default function ModuleHREmployeeDelete({
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

      const response = await deleteEmployee({ employeeId: pk });

      if (response.status === "success") {
        router.replace("/modules/hr/employees");

        return toast({
          title: "Employee Deleted",
          description: "Employee has been deleted successfully.",
          status: "success",
        })
      }
      throw new Error(response.message as string);

    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : "Error while deleting employee";

      return toast({
        title: "Failed to delete employee",
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
          Delete Emplpoyee
        </ModalHeader>
        <ModalBody
          fontSize={{ base: 'sm', md: 'xs' }}
        >
          Are you sure want to delete this Employee?
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
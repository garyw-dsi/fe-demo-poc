import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { deleteSalaryStructure } from "@/app/actions/modules/hr/salary-structures";

interface ModuleUAMUserDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  pk: number;
}

export default function ModuleHRSalaryStructureDelete({
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

      const response = await deleteSalaryStructure({ structureId: pk });

      if (response.status === "success") {
        router.replace("/modules/hr/salary-structures");

        return toast({
          title: "Salary Structure Deleted",
          description: "Salary Structure has been deleted successfully.",
          status: "success",
        })
      }
      throw new Error(response.message as string);

    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : "Error while deleting Salary Structure";

      return toast({
        title: "Failed to delete Salary Structure",
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
          Delete Structure
        </ModalHeader>
        <ModalBody
          fontSize={{ base: 'sm', md: 'xs' }}
        >
          Are you sure want to delete this Structure?
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
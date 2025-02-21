import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { deletePayroll } from "@/app/actions/modules/hr/payrolls";

interface ModuleUAMUserDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  pk: number;
}

export default function ModuleHRPayrollDelete({
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

      const response = await deletePayroll({ payrollId: pk });

      if (response.status === "success") {
        router.replace("/modules/hr/payrolls");

        return toast({
          title: "Payroll Deleted",
          description: "Payroll has been deleted successfully.",
          status: "success",
        })
      }
      throw new Error(response.message as string);

    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : "Error while deleting payroll";

      return toast({
        title: "Failed to delete payroll",
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
          Delete Payroll Batch
        </ModalHeader>
        <ModalBody
          fontSize={{ base: 'sm', md: 'xs' }}
        >
          Are you sure want to delete this Payroll batch?
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
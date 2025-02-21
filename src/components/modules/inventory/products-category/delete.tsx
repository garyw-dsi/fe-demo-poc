import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { deleteProductCategory } from "@/app/actions/modules/inventory/products-category";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  pk: number;
}

export default function ModuleInventoryProductCategoryDelete({
  isOpen,
  onClose,
  pk
}: Props) {
  const toast = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onDelete = async () => {
    try {
      setIsLoading(true);

      const { status, message } = await deleteProductCategory({ pk });

      if (status === "success") {
        router.replace("/modules/inventory/products/category");

        return toast({
          title: "Category Deleted",
          description: message,
          status: "success",
        });

      }
      throw new Error(message);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred while deleting the product category";

      return toast({
        title: "Failed to delete product",
        description: errorMessage,
        status: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
          Delete Category
        </ModalHeader>
        <ModalBody
          fontSize={{ base: 'sm', md: 'xs' }}
        >
          Are you sure want to delete this Product Category?
        </ModalBody>
        <ModalFooter gap={3}>
          <Button
            size={'sm'}
            fontSize={'xs'}
            onClick={onClose}
            isDisabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            colorScheme={'red'}
            size={'sm'}
            fontSize={'xs'}
            onClick={onDelete}
            isLoading={isLoading}
            loadingText="deleting..."
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
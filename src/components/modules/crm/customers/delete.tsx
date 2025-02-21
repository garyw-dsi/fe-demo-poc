import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, FormControl, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Stack, useToast } from "@chakra-ui/react";
import { deleteCustomer } from "@/app/actions/modules/crm/customers";
import { ModuleInputLabel } from "../../input";

interface ModuleCRMCustomerProps {
  isOpen: boolean;
  onClose: () => void;
  pk: number;
  cid: number;
}

export default function ModuleCRMCustomerDelete({
  isOpen,
  onClose,
  pk,
  cid
}: ModuleCRMCustomerProps) {
  const toast = useToast();
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteFromContactList, setDeleteFromContactList] = useState<string>("no");

  const onDelete = async () => {
    try {
      setIsDeleting(true);

      const response = await deleteCustomer({
        pk: pk,
        cid: deleteFromContactList === "yes"
          ? cid
          : null,
      });

      if (response.status === "success") {
        router.replace("/modules/crm/customers");

        return toast({
          title: "Customer Deleted",
          description: response.message as string,
          status: "success",
        });
      }

      return toast({
        title: "Failed to delete customer",
        description: response.message as string,
        status: "error",
      });
    } catch {
      return toast({
        title: "Failed to delete customer",
        description: "Error while deleting customer",
        status: "error",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={!isDeleting}
      closeOnOverlayClick={!isDeleting}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={{ base: 'lg', md: 'lg' }}>Delete Customer</ModalHeader>
        <ModalBody>
          <FormControl>
            <ModuleInputLabel label="Also Delete from Contact List?" />
            <RadioGroup
              onChange={(value) => setDeleteFromContactList(value)}
              value={deleteFromContactList}
              size={'sm'}
              fontSize={'xs'}
            >
              <Stack direction="row">
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
        </ModalBody>
        <ModalFooter gap={3}>
          <Button
            size="sm"
            fontSize="xs"
            onClick={onClose}
            isDisabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            colorScheme="red"
            size="sm"
            fontSize="xs"
            onClick={onDelete}
            isLoading={isDeleting}
            loadingText="Deleting..."
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

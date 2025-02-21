import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, FormControl, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Stack, useToast } from "@chakra-ui/react";
import { ModuleInputLabel } from "../../input";
import { deleteVendor } from "@/app/actions/modules/purchase/vendors";

interface ModulePurchaseVendorProps {
  isOpen: boolean;
  onClose: () => void;
  pk: number;
  cid: number;
}

export default function ModulePurchaseVendorDelete({
  isOpen,
  onClose,
  pk,
  cid
}: ModulePurchaseVendorProps) {
  const toast = useToast();
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteFromContactList, setDeleteFromContactList] = useState<string>("no");

  const onDelete = async () => {
    try {
      setIsDeleting(true);

      const { status, message } = await deleteVendor({
        pk: pk,
        cid: deleteFromContactList === "yes"
          ? cid
          : null,
      });

      if (status === "success") {
        router.replace("/modules/purchase/vendors");

        return toast({
          title: "Vendor Deleted",
          description: message as string,
          status: "success",
        });
      }

      throw new Error(message as string);
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : "Error while deleting customer";

      return toast({
        title: "Failed to delete Vendor",
        description: message,
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
        <ModalHeader fontSize={{ base: 'lg', md: 'lg' }}>Delete Vendor</ModalHeader>
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

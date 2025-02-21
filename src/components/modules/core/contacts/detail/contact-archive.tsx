"use client"

import { softDeleteContact } from "@/app/actions/modules/core/contacts";
import { components } from "@/libs/api/schema/core-services";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { Fragment, useState } from "react";

const ArchiveConfirmation = ({
  isOpen, onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const toast = useToast();
  const params = useParams();
  const pk = Number(params.pk);

  const [loading, setLoading] = useState<boolean>(false);

  const onArchive = async () => {
    setLoading(true);
    try {
      const { status, message } = await softDeleteContact({ contactId: pk });

      if (status === "success") {
        onClose();
        return toast({
          title: "Contact archived",
          description: message,
          status: "success"
        });
      }

      throw new Error(message);
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : "Failed to archive contact";

      return toast({
        title: "Error archiving contact",
        description: message,
        status: "error"
      });

    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnEsc={!loading} closeOnOverlayClick={!loading}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={{ base: 'lg', md: 'lg' }}>
          Archive Confirmation
        </ModalHeader>
        <ModalBody>
          <Text
            fontSize={'sm'}
            color={'gray.500'}
          >
            if you archive this contact, you can not use this contact anymore.
            Unless you unarchive it.
          </Text>
        </ModalBody>
        <ModalFooter gap={3}>
          <Button
            size="sm"
            fontSize="xs"
            onClick={onClose}
            isDisabled={loading}
          >
            Cancel
          </Button>
          <Button
            colorScheme="red"
            size="sm"
            fontSize="xs"
            onClick={onArchive}
            isLoading={loading}
            loadingText="Archiving..."
          >
            Archive
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default function ModuleContactArchived({
  contact
}: {
  contact: components['schemas']['Contact'];
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Fragment>
      <ArchiveConfirmation
        isOpen={isOpen}
        onClose={onClose}
      />
      <Button
        size={'sm'}
        fontSize={'xs'}
        onClick={onOpen}
        colorScheme={contact.deleted_at ? 'teal' : 'red'}
      >
        {contact.deleted_at ? 'Unarchive' : 'Archive'}
      </Button>
    </Fragment>
  )
}
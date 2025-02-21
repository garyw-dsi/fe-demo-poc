"use client"

import { Button, Icon, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { Fragment } from "react";
import { TbTransactionDollar } from "react-icons/tb";

const PurchaseQuotationOrderModal = ({ isOpen, onClose, onSubmit }: {
  isOpen: boolean,
  onClose: () => void,
  onSubmit: () => void
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} closeOnEsc={true}>
      <ModalOverlay />
      <ModalContent bg={useColorModeValue('white', 'gray.800')}>
        <ModalHeader fontSize={'md'}>
          Create Order
        </ModalHeader>
        <ModalBody>
          <Text
            fontSize={'sm'}
            color={useColorModeValue('gray.500', 'gray.500')}
          >
            Do you want to create an order for this quotation?
          </Text>
        </ModalBody>
        <ModalFooter gap={3}>
          <Button
            size={'sm'}
            fontSize={'xs'}
            onClick={onClose}
            variant={'ghost'}
          >
            Cancel
          </Button>
          <Button
            size={'sm'}
            fontSize={'xs'}
            colorScheme={'blue'}
            onClick={onSubmit}
          >
            Proceed
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default function ModulePurchaseQuotationAction() {
  const params = useParams();
  const router = useRouter();

  const pk = params.pk;

  const { onOpen, onClose, isOpen } = useDisclosure();

  const onSubmit = async () => {
    onClose();
    router.push(`/modules/purchase/orders/create/${pk}`);
  }

  return (
    <Fragment>
      <PurchaseQuotationOrderModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
      />
      <Button
        size={'sm'}
        fontSize={'xs'}
        variant={'outline'}
        colorScheme="blue"
        rightIcon={
          <Icon as={TbTransactionDollar} boxSize={4} />
        }
        onClick={onOpen}
      >
        Create Purchase Order
      </Button>
    </Fragment>
  )
}
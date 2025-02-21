"use client"

import { createInvoiceFromOrder } from "@/app/actions/modules/purchase/invoices";
import { Button, Icon, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { TbTransactionDollar } from "react-icons/tb";

const PurchaseOrderInvoiceModal = ({ isOpen, onClose, onSubmit, loading }: {
  isOpen: boolean,
  onClose: () => void,
  onSubmit: () => void,
  loading: boolean
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      closeOnEsc={loading ? false : true}
    >
      <ModalOverlay />
      <ModalContent bg={useColorModeValue('white', 'gray.800')}>
        <ModalHeader fontSize={'md'}>
          Create Invoice
        </ModalHeader>
        <ModalBody>
          <Text
            fontSize={'sm'}
            color={useColorModeValue('gray.500', 'gray.500')}
          >
            Do you want to create an invoice for this order?
          </Text>
        </ModalBody>
        <ModalFooter gap={3}>
          <Button
            size={'sm'}
            fontSize={'xs'}
            onClick={onClose}
            variant={'ghost'}
            isDisabled={loading}
          >
            Cancel
          </Button>
          <Button
            size={'sm'}
            fontSize={'xs'}
            colorScheme={'blue'}
            onClick={onSubmit}
            isLoading={loading}
            loadingText="Creating Invoice..."
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default function ModulePurchaseOrderAction() {
  const params = useParams();
  const router = useRouter();

  const pk = Number(params.pk);

  const toast = useToast();
  const { onOpen, onClose, isOpen } = useDisclosure();

  const [invoiced, setInvoiced] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const { status, message } = await createInvoiceFromOrder({ orderId: pk });

      if (status === "success") {
        onClose();
        setInvoiced(true);

        return toast({
          title: "Invoice Created",
          description: message,
          status: "success",
        });
      }

      throw new Error(message);
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : "An error occurred while creating invoice";

      return toast({
        title: "Error",
        description: message,
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  if (invoiced) {
    return (
      <Button
        size={'sm'}
        fontSize={'xs'}
        colorScheme="teal"
        rightIcon={
          <Icon as={TbTransactionDollar} boxSize={4} />
        }
        onClick={() => router.push(`/modules/purchase/invoices/detail/${pk}`)}
      >
        View Invoice
      </Button>
    )
  }

  return (
    <Fragment>
      <PurchaseOrderInvoiceModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        loading={loading}
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
        Create Invoice
      </Button>
    </Fragment>
  )
}
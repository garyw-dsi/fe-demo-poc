"use client"

import { components } from "@/libs/api/schema/sales";
import { Button, Flex, Icon, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { Fragment, useTransition } from "react";
import { TbTransactionDollar } from "react-icons/tb";

const SalesOrderInvoiceModal = ({ isOpen, onClose, onSubmit, loading }: {
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
            loadingText="Creating..."
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default function ModuleSalesOrderAction({
  status,
  sendEmail
}: {
  status: components['schemas']['Order']['status'],
  sendEmail: React.ReactNode
}) {
  const params = useParams();
  const router = useRouter();

  const pk = Number(params.pk);

  const [pending, creatingInvoice] = useTransition();
  const { onOpen, onClose, isOpen } = useDisclosure();

  const onSubmit = () => {
    creatingInvoice(() => {
      router.push(`/modules/sales/invoices/create/${pk}`);
    })
  }

  return (
    <Fragment>
      <SalesOrderInvoiceModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        loading={pending}
      />
      <Flex align={'center'} gap={2}>
        {["Approved", "Issued"]
          .includes(status) && sendEmail
        }

        {status === "Issued" && (
          <Button
            w={{ base: "full", md: "fit-content" }}
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
        )}
      </Flex>
    </Fragment>
  )
}
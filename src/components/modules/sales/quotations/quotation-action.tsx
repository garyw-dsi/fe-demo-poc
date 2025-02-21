"use client"

import { components } from "@/libs/api/schema/sales";
import { Button, Flex, Icon, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { Fragment, useTransition } from "react";
import { TbTransactionDollar } from "react-icons/tb";

const SalesQuotationOrderModal = ({ loading, isOpen, onClose, onSubmit }: {
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
            loadingText="Processing..."
          >
            Proceed
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default function ModuleSalesQuotationAction({
  status,
  sendEmail
}: {
  status: components['schemas']['Quotation']['status'],
  sendEmail: React.ReactNode
}) {
  const [pending, onCreateOrder] = useTransition();
  const params = useParams();
  const router = useRouter();

  const pk = params.pk;

  const { onOpen, onClose, isOpen } = useDisclosure();

  const onSubmit = async () => {
    onCreateOrder(() => {
      router.push(`/modules/sales/orders/create/${pk}`);
      onClose();
    });
  }

  return (
    <Fragment>
      <SalesQuotationOrderModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        loading={pending}
      />

      <Flex align={'center'} gap={2} flexWrap={'wrap'}>
        {["Approved", "Issued"]
          .includes(status) && sendEmail
        }

        {status === "Issued" && (
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
            Create Order
          </Button>
        )}
      </Flex>
    </Fragment>
  )
}
"use client"

import { Fragment, useTransition } from "react";
import { Button, Icon, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Box } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { MdOutlineRequestQuote } from "react-icons/md";

import { components } from "@/libs/api/schema/crm";

const PATHNAME = '/modules/sales/quotations';

const ALLOWED_STATUSES = [
  "New",
  "Contacted",
  "Qualified",
];


const CRMLeadQuotationModal = ({ loading, isOpen, onClose, onSubmit }: {
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
      <ModalContent>
        <ModalHeader>
          Create Quotation
        </ModalHeader>
        <ModalBody>
          Do you want to create a quotation for this lead?
        </ModalBody>
        <ModalFooter>
          <Button
            size={'sm'}
            onClick={onClose}
            variant={'ghost'}
            isDisabled={loading}
          >
            Cancel
          </Button>
          <Button
            size={'sm'}
            colorScheme={'blue'}
            onClick={onSubmit}
            isLoading={loading}
            loadingText={'Processing...'}
          >
            Proceed
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default function ModuleCRMLeadAction({
  data,
}: {
  data: components['schemas']['Lead'];
}) {
  const [pending, onCreateQuotation] = useTransition();
  const params = useSearchParams();
  const router = useRouter();


  const { onOpen, onClose, isOpen } = useDisclosure();

  const setQuotationParams = (params: URLSearchParams, data: components['schemas']['Lead']) => {
    if (!data.customer?.pk || !data.pk) {
      throw new Error('Missing required lead data for quotation');
    }

    params.set('customer_id', data.customer.pk.toString());
    params.set('lead_id', data.pk.toString());
    params.set('from', 'lead');

    return params;
  }

  const onSubmit = async () => {
    onCreateQuotation(() => {
      try {
        const param = new URLSearchParams(params);
        const updatedParams = setQuotationParams(param, data);
        const path = `${PATHNAME}/create?${updatedParams.toString()}`;

        router.push(path);
        onClose();
      } catch (error) {
        console.error('Failed to create quotation:', error);
      }
    });
  }

  const showQuotationButton = ALLOWED_STATUSES.includes(data.lead_status);

  return (
    <Fragment>
      <CRMLeadQuotationModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        loading={pending}
      />
      {showQuotationButton ? (
        <Button
          size={'sm'}
          fontSize={'xs'}
          variant={'outline'}
          colorScheme="blue"
          rightIcon={
            <Icon as={MdOutlineRequestQuote} boxSize={4} />
          }
          onClick={onOpen}
        >
          Create Quotation
        </Button>
      ) : (
        <Box h="32px" w="140px" />
      )}
    </Fragment>
  )
}
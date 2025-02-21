"use client"

import { Button, FormControl, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from "@chakra-ui/react"
import { useRouter } from "next/navigation";
import { Formik } from "formik";
import { ModuleInputErrorMessage, ModuleInputLabel } from "@/components/modules/input";
import ModulePurchaseOrderSelect from "../../orders/select";

export default function ModulePurchaseInvoicesCreateForm({
  initialOrder
}: {
  initialOrder: {
    value: string;
    label: string;
  }[]
}) {
  const router = useRouter();
  const { isOpen } = useDisclosure({ defaultIsOpen: true });

  const onClose = () => {
    router.push("/modules/sales/invoices");
    return;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      size={{ base: 'full', md: 'lg' }}
    >
      <ModalOverlay />
      <Formik
        initialValues={{
          order_id: ""
        }}
        onSubmit={(values) => {
          router.push(`/modules/purchase/orders/detail/${values.order_id}`);
          return;
        }}
        validate={(values) => {
          const errors: { order_id?: string } = {};
          if (!values.order_id) {
            errors.order_id = "Order selection is required.";
          }
          return errors;
        }}
      >
        {({ values, errors, handleSubmit, touched, isSubmitting }) => (
          <ModalContent as="form" action={() => handleSubmit()}>
            <ModalHeader as={Stack} spacing={1}>
              <Text
                fontSize={'md'}
                fontWeight={'semibold'}
              >
                Create Invoice
              </Text>
              <Text
                fontSize={'xs'}
                color={'gray.500'}
                lineHeight={1.6}
              >
                Generate invoice from Purchase Order
              </Text>
            </ModalHeader>
            <ModalBody>
              <FormControl
                isRequired
                isInvalid={!!errors.order_id && touched.order_id}
              >
                <ModuleInputLabel label="Select Purchase Order to generate invoice" />
                <ModulePurchaseOrderSelect
                  initialValue={initialOrder}
                  fieldName="order_id"
                  placeholder="Find Purchase Order by Order ID"
                />
                <ModuleInputErrorMessage value={errors.order_id} />
              </FormControl>
            </ModalBody>
            <ModalFooter gap={3}>
              <Button
                size={'sm'}
                fontSize={'xs'}
                colorScheme="gray"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                size={'sm'}
                fontSize={'xs'}
                colorScheme="blue"
                isDisabled={
                  Object.keys(errors).length > 0 ||
                  !values.order_id
                }
                type="submit"
                isLoading={isSubmitting}
                loadingText="Processing..."
              >
                Process
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Formik>
    </Modal>
  )
}
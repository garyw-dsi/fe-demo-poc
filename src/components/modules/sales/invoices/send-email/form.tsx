"use client"

import { FormState } from "@/libs/api/constants";
import { Alert, AlertIcon, Button, FormControl, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure } from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { useFormState } from "react-dom";
import { ModuleInput, ModuleInputErrorMessage, ModuleInputLabel } from "@/components/modules/input";
import { sendQuotationEmailSchema } from "@/libs/yup/sales/quotations";
import ModalSendInvoiceButton from "./button";
import { Fragment } from "react";
import { useParams } from "next/navigation";
import { sendInvoiceEmail } from "@/app/actions/modules/sales/invoices";

interface InitialState extends FormState {
  data?: {
    pk: number;
    name: string;
  };
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function ModalSendInvoiceEmail({
  isOpen, onClose
}: Props) {
  const params = useParams();

  const pk = params.pk;

  const initialState: InitialState = {
    status: "idle",
    message: ""
  };

  const [invoiceEmailState, sendInvoiceEmailAction] = useFormState(
    sendInvoiceEmail,
    initialState
  );

  const handleClose = () => {
    invoiceEmailState.status = "idle";
    invoiceEmailState.message = "";

    onClose();

    return;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      closeOnEsc={false}
    >
      <ModalOverlay />
      <ModalContent>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={sendQuotationEmailSchema}
          onSubmit={async (values, { resetForm }) => {
            const formData = new FormData();

            formData.append("pk", pk.toString());
            formData.append("email", values.email);

            sendInvoiceEmailAction(formData);
            resetForm();
          }}
        >
          {({ errors, touched, handleSubmit }) => (
            <form
              action={() => handleSubmit()}
              onReset={handleClose}
            >
              <ModalHeader fontSize={{ base: "sm" }}>
                Send Invoice Email
              </ModalHeader>
              <ModalBody>
                <FormControl
                  isRequired
                  isInvalid={!!errors.email && touched.email}
                >
                  <ModuleInputLabel label="Receipant Email" />
                  <Field
                    as={ModuleInput}
                    type="email"
                    name="email"
                    placeholder="Enter email"
                  />
                  <ModuleInputErrorMessage value={errors.email} />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Stack w={"full"}>
                  {invoiceEmailState?.status === "error" && (
                    <Alert
                      status={invoiceEmailState?.status}
                      fontSize={{ base: "sm", md: "xs" }}
                      rounded={"md"}
                      py={2}
                    >
                      <AlertIcon />
                      {invoiceEmailState.message}
                    </Alert>
                  )}
                  {invoiceEmailState?.status === "success" && (
                    <Alert
                      status={"success"}
                      fontSize={{ base: "sm", md: "xs" }}
                      rounded={"md"}
                      py={2}
                    >
                      <AlertIcon />
                      {invoiceEmailState.message}
                    </Alert>
                  )}
                  <ModalSendInvoiceButton />
                </Stack>
              </ModalFooter>
            </form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  )
}

export default function ModuleSalesInvoiceSendEmailForm() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Fragment>
      <ModalSendInvoiceEmail
        isOpen={isOpen}
        onClose={onClose}
      />

      <Button
        w={{ base: "full", md: "fit-content" }}
        size={'sm'}
        fontSize={'xs'}
        colorScheme="teal"
        onClick={onOpen}
      >
        Send Email
      </Button>
    </Fragment>
  )
}
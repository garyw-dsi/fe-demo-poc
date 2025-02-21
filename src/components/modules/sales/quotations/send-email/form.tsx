"use client"

import { FormState } from "@/libs/api/constants";
import { Alert, AlertIcon, Button, FormControl, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure } from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { useFormState } from "react-dom";
import { ModuleInput, ModuleInputErrorMessage, ModuleInputLabel } from "@/components/modules/input";
import { sendQuotationEmail } from "@/app/actions/modules/sales/quotations";
import { sendQuotationEmailSchema } from "@/libs/yup/sales/quotations";
import ModalSendQuotationButton from "./button";
import { Fragment } from "react";
import { useParams } from "next/navigation";

interface InitialState extends FormState {
  data?: {
    pk: number;
    name: string;
  };
}

interface ModalCreateTagProps {
  isOpen: boolean;
  onClose: () => void;
}

function ModalSendQuotationEmail({
  isOpen, onClose
}: ModalCreateTagProps) {
  const params = useParams();

  const pk = params.pk;

  const initialState: InitialState = {
    status: "idle",
    message: ""
  };

  const [quotationEmailState, sendQuotationEmailAction] = useFormState(
    sendQuotationEmail,
    initialState
  );

  const handleClose = () => {
    quotationEmailState.status = "idle";
    quotationEmailState.message = "";

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

            sendQuotationEmailAction(formData);
            resetForm();
          }}
        >
          {({ errors, touched, handleSubmit }) => (
            <form
              action={() => handleSubmit()}
              onReset={handleClose}
            >
              <ModalHeader fontSize={{ base: "sm" }}>
                Send Quotation Email
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
                  {quotationEmailState?.status === "error" && (
                    <Alert
                      status={quotationEmailState?.status}
                      fontSize={{ base: "sm", md: "xs" }}
                      rounded={"md"}
                      py={2}
                    >
                      <AlertIcon />
                      {quotationEmailState.message}
                    </Alert>
                  )}
                  {quotationEmailState?.status === "success" && (
                    <Alert
                      status={"success"}
                      fontSize={{ base: "sm", md: "xs" }}
                      rounded={"md"}
                      py={2}
                    >
                      <AlertIcon />
                      {quotationEmailState.message}
                    </Alert>
                  )}
                  <ModalSendQuotationButton />
                </Stack>
              </ModalFooter>
            </form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  )
}

export default function ModuleSalesQuotationSendEmailForm() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Fragment>
      <ModalSendQuotationEmail
        isOpen={isOpen}
        onClose={onClose}
      />

      <Button
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
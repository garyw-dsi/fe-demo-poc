"use client"

import { createNewTag } from "@/app/actions/modules/core/tags";
import { FormState } from "@/libs/api/constants";
import { createTagSchema } from "@/libs/yup/core/tags";
import { Alert, AlertIcon, FormControl, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack } from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { useFormState } from "react-dom";
import ModalCreateTagButton from "./button";
import { ModuleInput, ModuleInputErrorMessage, ModuleInputLabel } from "@/components/modules/input";
import { useEffect } from "react";

interface InitialState extends FormState {
  data?: {
    pk: number;
    name: string;
  };
}

interface ModalCreateTagProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTag?: ({ value, label }: { value: string; label: string }) => void;
}

export default function ModalCreateTag({
  isOpen, onClose, onCreateTag
}: ModalCreateTagProps) {

  const initialState: InitialState = {
    status: "idle",
    message: ""
  };

  const [createTagState, createTagAction] = useFormState(
    createNewTag,
    initialState
  );

  const handleClose = () => {
    createTagState.status = "idle";
    createTagState.message = "";

    onClose();

    return;
  }

  useEffect(() => {
    if (
      onCreateTag &&
      createTagState?.status === "success"
    ) {
      onCreateTag({
        value: createTagState.data?.pk.toString() || "",
        label: createTagState.data?.name || ""
      });

      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createTagState]);

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
          initialValues={{ name: "" }}
          validationSchema={createTagSchema}
          onSubmit={async (values, { resetForm }) => {
            const formData = new FormData();
            formData.append("name", values.name);

            createTagAction(formData);
            resetForm();
          }}
        >
          {({ errors, touched, handleSubmit }) => (
            <form
              action={() => handleSubmit()}
              onReset={handleClose}
            >
              <ModalHeader fontSize={{ base: "sm" }}>
                Add New Tag
              </ModalHeader>
              <ModalBody>
                <FormControl
                  isRequired
                  isInvalid={!!errors.name && touched.name}
                >
                  <ModuleInputLabel label="Tag Name" />
                  <Field
                    as={ModuleInput}
                    name="name"
                    placeholder="Input Tag Name..."
                  />
                  <ModuleInputErrorMessage value={errors.name} />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Stack w={"full"}>
                  {createTagState?.status === "error" && (
                    <Alert
                      status={createTagState?.status}
                      fontSize={{ base: "sm", md: "xs" }}
                      rounded={"md"}
                      py={2}
                    >
                      <AlertIcon />
                      {createTagState.message}
                    </Alert>
                  )}
                  {createTagState?.status === "success" && (
                    <Alert
                      status={"success"}
                      fontSize={{ base: "sm", md: "xs" }}
                      rounded={"md"}
                      py={2}
                    >
                      <AlertIcon />
                      {createTagState.message}
                    </Alert>
                  )}
                  <ModalCreateTagButton />
                </Stack>
              </ModalFooter>
            </form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  )
}

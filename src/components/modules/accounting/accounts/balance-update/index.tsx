"use client"

import { useFormState } from "react-dom"
import { Fragment } from "react"
import { Alert, AlertIcon, Button, FormControl, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure } from "@chakra-ui/react"
import { Field, Formik } from "formik"

import { updateBalanceAccountSchema } from "@/libs/yup/accounting/accounts"
import { updateBalanceAccount } from "@/app/actions/modules/accounting/accounts"
import { FormState } from "@/libs/api/constants"

import { ModuleInput, ModuleInputErrorMessage, ModuleInputLabel } from "@/components/modules/input"
import ModalUpdateAccountBalanceButton from "./button"


interface IUpdateBalanceModal {
  isOpen: boolean
  onClose: () => void
  accountId: number
  initialAmount: number
}

const UpdateBalanceModal = ({
  isOpen,
  onClose,
  accountId,
  initialAmount
}: IUpdateBalanceModal) => {
  const initialState: FormState = {
    status: "idle",
    message: ""
  }

  const [updateBalanceState, updateBalanceAction] = useFormState(
    updateBalanceAccount,
    initialState
  )

  const handleClose = () => {
    updateBalanceState.status = "idle";
    updateBalanceState.message = "";

    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      size={{ base: "full", sm: "md" }}
    >
      <ModalOverlay />
      <ModalContent>
        <Formik
          initialValues={{
            amount: initialAmount
          }}
          validationSchema={updateBalanceAccountSchema}
          onSubmit={(values) => {
            const formData = new FormData();

            formData.append("amount", values.amount.toString());
            formData.append("account_id", accountId.toString());

            updateBalanceAction(formData);
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form
              action={() => handleSubmit()}
              onReset={handleClose}
            >
              <ModalHeader fontSize={{ base: "sm" }}>
                Update Balance Account
              </ModalHeader>
              <ModalBody>
                <FormControl
                  isRequired
                  isInvalid={!!errors.amount && touched.amount}
                >
                  <ModuleInputLabel label="Amount" />
                  <Field as={ModuleInput} name="amount" />
                  <ModuleInputErrorMessage value={errors.amount} />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Stack w={"full"}>
                  {["error", "success"].includes(updateBalanceState?.status) && (
                    <Alert
                      status={
                        updateBalanceState?.status === "success"
                          ? "success"
                          : "error"
                      }
                      fontSize={{ base: "sm", md: "xs" }}
                      rounded={"md"}
                      py={2}
                    >
                      <AlertIcon />
                      {updateBalanceState.message}
                    </Alert>
                  )}
                  <ModalUpdateAccountBalanceButton />
                </Stack>
              </ModalFooter>
            </form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  )
}

export default function ModuleAccountingAccountUpdateBalance({
  accountId,
  initialAmount
}: {
  accountId: number
  initialAmount: number
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Fragment>
      <UpdateBalanceModal
        accountId={accountId}
        initialAmount={initialAmount}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Button
        colorScheme={'blue'}
        size={'xs'}
        fontSize={'xs'}
        variant={'outline'}
        onClick={onOpen}
      >
        Update Balance
      </Button>
    </Fragment>
  )
}
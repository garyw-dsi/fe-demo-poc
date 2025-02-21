"use client"

import { useFormState } from "react-dom"
import { Fragment } from "react"
import { Alert, AlertIcon, Button, FormControl, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure } from "@chakra-ui/react"
import { Field, Formik } from "formik"
import { updateProductStock } from "@/app/actions/modules/inventory/products"

import { FormState } from "@/libs/api/constants"
import { productStockSchema } from "@/libs/yup/inventory/product"

import { ModuleInput, ModuleInputErrorMessage, ModuleInputLabel } from "@/components/modules/input"
import ModalUpdateProductStockButton from "./button"


interface IUpdateStockModal {
  isOpen: boolean
  onClose: () => void
  productId: number
  initialStock: number
}

const UpdateProductStockModal = ({
  isOpen,
  onClose,
  productId,
  initialStock
}: IUpdateStockModal) => {
  const initialState: FormState = {
    status: "idle",
    message: ""
  }

  const [updateStockState, updateStockAction] = useFormState(
    updateProductStock,
    initialState
  )

  const handleClose = () => {
    updateStockState.status = "idle";
    updateStockState.message = "";

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
            stock: initialStock
          }}
          validationSchema={productStockSchema}
          onSubmit={(values) => {
            const formData = new FormData();

            formData.append("stock", values.stock.toString());
            formData.append("product_id", productId.toString());

            updateStockAction(formData);
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form
              action={() => handleSubmit()}
              onReset={handleClose}
            >
              <ModalHeader fontSize={{ base: "sm" }}>
                Update Product Stock
              </ModalHeader>
              <ModalBody>
                <FormControl
                  isRequired
                  isInvalid={!!errors.stock && touched.stock}
                >
                  <ModuleInputLabel label="Product Stock" />
                  <Field as={ModuleInput} name="stock" />
                  <ModuleInputErrorMessage value={errors.stock} />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Stack w={"full"}>
                  {["error", "success"].includes(updateStockState?.status) && (
                    <Alert
                      status={
                        updateStockState?.status === "success"
                          ? "success"
                          : "error"
                      }
                      fontSize={{ base: "sm", md: "xs" }}
                      rounded={"md"}
                      py={2}
                    >
                      <AlertIcon />
                      {updateStockState.message}
                    </Alert>
                  )}
                  <ModalUpdateProductStockButton />
                </Stack>
              </ModalFooter>
            </form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  )
}

export default function ModuleInventoryProductUpdateStock({
  productId,
  initialStock
}: {
  productId: number
  initialStock: number
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Fragment>
      <UpdateProductStockModal
        productId={productId}
        initialStock={initialStock}
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
        Update Stock
      </Button>
    </Fragment>
  )
}
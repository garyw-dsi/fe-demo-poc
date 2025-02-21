"use client"

import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { Alert, AlertIcon, Flex } from "@chakra-ui/react";
import { Formik } from "formik";

import { FormState } from "@/libs/api/constants";
import SuccessAlert from "@/components/alert/success";
import ModuleInventoryProductCategorySubmit from "../button";
import { createProductCategory } from "@/app/actions/modules/inventory/products-category";
import { ProductCategory, productCategorySchema } from "@/libs/yup/inventory/product-category";
import ModuleInventoryProductCategoryInformationCreate from "./category-information";

const initialValues: ProductCategory = {
  name: "",
  expense_account_id: NaN,
  income_account_id: NaN,
};

export default function ModuleInventoryProductCategoryCreateForm({
  initialAccounts
}: {
  initialAccounts: {
    value: string;
    label: string;
  }[] | undefined;
}) {
  const router = useRouter();

  const initialState: FormState = {
    status: "idle",
    message: "",
  };

  const [createCategoryState, createCategoryAction] = useFormState(
    createProductCategory,
    initialState
  );

  const onClose = () => {
    router.push("/modules/inventory/products/category");
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={productCategorySchema}
      onSubmit={(values) => {
        const formData = new FormData();

        formData.append("name", values.name);
        formData.append("income_account_id", values.income_account_id.toString());
        formData.append("expense_account_id", values.expense_account_id.toString());

        createCategoryAction(formData);
      }}
    >
      {({ handleSubmit }) => (
        <Flex as="form"
          action={() => handleSubmit()}
          direction={'column'}
          w={'full'}
          gap={5}
        >
          <SuccessAlert
            isOpen={createCategoryState.status === "success"}
            title="Product Category Created"
            description={createCategoryState.message}
            onClose={onClose}
          />

          {createCategoryState.status === "error" && (
            <Alert status={"error"}
              fontSize={{ base: "sm", md: "xs" }}
              rounded={"md"}
              variant={'solid'}
            >
              <AlertIcon />
              {createCategoryState.message}
            </Alert>
          )}
          <ModuleInventoryProductCategoryInformationCreate
            initialAccounts={initialAccounts}
          />
          <Flex justify={'end'}>
            <ModuleInventoryProductCategorySubmit />
          </Flex>
        </Flex>
      )}
    </Formik>
  )
}
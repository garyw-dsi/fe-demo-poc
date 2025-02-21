"use client"

import { useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { Alert, AlertIcon, Flex } from "@chakra-ui/react";
import { Formik } from "formik";

import { FormState } from "@/libs/api/constants";
import SuccessAlert from "@/components/alert/success";
import { createProduct } from "@/app/actions/modules/inventory/products";
import { Products, productSchema } from "@/libs/yup/inventory/product";
import ModuleInventoryProductSubmit from "@/components/modules/inventory/products/button";
import ModuleInventoryProductInformationCreate from "./product-information";
import ModuleInventoryProductAccountInformationCreate from "./account-information";

const initialValues: Products = {
  name: "",
  product_type: "Goods",
  tags: [],
  image: "",
  currency: NaN,
  price: null,
  expense_account_id: null,
  income_account_id: null,
  product_category_id: NaN,
  unit: "Unknown"
};

interface Option {
  value: string;
  label: string;
}

interface Props {
  initialAccounts: Option[] | undefined;
  currency: Option[] | undefined;
  category: Option[] | undefined;
}

export default function ModuleInventoryProductCreateForm({
  initialAccounts,
  currency,
  category
}: Props) {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);

  const initialState: FormState = {
    status: "idle",
    message: "",
  };

  const [createProductState, setCreateProduct] = useFormState(
    createProduct,
    initialState
  );

  const onClose = () => {
    router.push("/modules/inventory/products");
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={productSchema}
      onSubmit={(values) => {
        const formData = new FormData();

        formData.append("name", values.name);
        formData.append("product_type", values.product_type);
        formData.append("currency", values.currency.toString());

        if (values.price) {
          formData.append("price", values.price.toString());
        }

        if (file) {
          formData.append("image", file as Blob);
        }

        values.tags?.forEach((tag) => {
          formData.append("tags", tag as string);
        });

        if (values.expense_account_id) {
          formData.append("expense_account_id", values.expense_account_id.toString());
        }

        if (values.income_account_id) {
          formData.append("income_account_id", values.income_account_id.toString());
        }

        formData.append("product_category_id", values.product_category_id.toString());
        formData.append("unit", values.unit);

        setCreateProduct(formData);
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
            isOpen={createProductState?.status === "success"}
            title="Product Created"
            description="Product has been created successfully."
            onClose={onClose}
          />

          {createProductState?.status === "error" && (
            <Alert status={"error"}
              fontSize={{ base: "sm", md: "xs" }}
              rounded={"md"}
              variant={'solid'}
            >
              <AlertIcon />
              {createProductState.message}
            </Alert>
          )}

          <ModuleInventoryProductInformationCreate
            category={category}
            currency={currency}
            setFile={setFile}
          />

          <ModuleInventoryProductAccountInformationCreate
            initialAccounts={initialAccounts}
          />

          <Flex justify={'end'}>
            <ModuleInventoryProductSubmit />
          </Flex>
        </Flex>
      )}
    </Formik>
  )
}
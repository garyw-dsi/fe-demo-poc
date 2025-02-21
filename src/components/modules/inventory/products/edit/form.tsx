"use client"

import { useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { Alert, AlertIcon, Flex } from "@chakra-ui/react";
import { Formik } from "formik";

import { FormState } from "@/libs/api/constants";

import SuccessAlert from "@/components/alert/success";
import { editProduct } from "@/app/actions/modules/inventory/products";
import { Products, productSchema } from "@/libs/yup/inventory/product";
import { components } from "@/libs/api/schema/inventory";
import ModuleInventoryProductInformationEdit from "./product-information";
import ModuleInventoryProductSubmit from "../button";
import ModuleInventoryProductAccountInformationEdit from "./account-information";

interface Option {
  value: string;
  label: string;
}

interface Props {
  initialAccounts: Option[] | undefined;
  currency: Option[] | undefined;
  category: Option[] | undefined;
  initialProduct: components["schemas"]["Product"];
}

export default function ModuleInventoryProductEditForm({
  initialProduct,
  currency,
  initialAccounts,
  category
}: Props) {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);

  const initialState: FormState = {
    status: "idle",
    message: "",
  };

  const [updateProductState, setUpdateProduct] = useFormState(
    editProduct,
    initialState
  );

  const onClose = () => {
    router.push("/modules/inventory/products");
  }

  return (
    <Formik
      initialValues={{
        name: initialProduct.name,
        product_type: initialProduct.product_type,
        tags: initialProduct.tags.map(tag => tag.pk.toString()),
        image: initialProduct.image.url,
        currency: initialProduct.currency.pk,
        price: Number(initialProduct.price),
        product_category_id: initialProduct.product_category.pk,
        unit: initialProduct.unit as components['schemas']['Unit'],
        expense_account_id: initialProduct.expense_account?.pk,
        income_account_id: initialProduct.income_account?.pk,
      } as Products}
      validationSchema={productSchema}
      onSubmit={(values) => {
        const formData = new FormData();

        formData.append("pk", initialProduct.pk.toString());

        formData.append("name", values.name);
        formData.append("currency", values.currency.toString());

        if (values.price) {
          formData.append("price", values.price.toString());
        }

        if (file) {
          formData.append("image", file as Blob);
          formData.append("media_status", "changed")
        }

        if (
          values.image === initialProduct.image.url
        ) {
          formData.append("media_status", "unchanged")
        }

        if (!values.image) {
          formData.append("media_status", "deleted")
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

        setUpdateProduct(formData);
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
            isOpen={updateProductState?.status === "success"}
            title="Product Updated"
            description={updateProductState.message}
            onClose={onClose}
          />

          {updateProductState?.status === "error" && (
            <Alert status={"error"}
              fontSize={{ base: "sm", md: "xs" }}
              rounded={"md"}
              variant={'solid'}
            >
              <AlertIcon />
              {updateProductState.message}
            </Alert>
          )}

          <ModuleInventoryProductInformationEdit
            initialProduct={initialProduct}
            category={category}
            currency={currency}
            setFile={setFile}
          />

          <ModuleInventoryProductAccountInformationEdit
            initialAccounts={initialAccounts}
            initialProduct={initialProduct}
          />

          <Flex justify={'end'}>
            <ModuleInventoryProductSubmit />
          </Flex>
        </Flex>
      )}
    </Formik>
  )
}
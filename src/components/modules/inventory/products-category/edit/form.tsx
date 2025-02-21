"use client"

import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { Alert, AlertIcon, Flex } from "@chakra-ui/react";
import { Formik } from "formik";

import { FormState } from "@/libs/api/constants";
import SuccessAlert from "@/components/alert/success";
import ModuleInventoryProductCategorySubmit from "../button";
import { updateProductCategory } from "@/app/actions/modules/inventory/products-category";
import { ProductCategory, productCategorySchema } from "@/libs/yup/inventory/product-category";
import { components } from "@/libs/api/schema/inventory";
import ModuleInventoryProductCategoryInformationEdit from "./category-information";

export default function ModuleInventoryProductCategoryEditForm({
  initialAccounts,
  initialData
}: {
  initialAccounts: {
    value: string;
    label: string;
  }[] | undefined;
  initialData: components['schemas']['ProductCategory'];
}) {
  const router = useRouter();

  const initialState: FormState = {
    status: "idle",
    message: "",
  };

  const [updateCategoryState, updateCategoryAction] = useFormState(
    updateProductCategory,
    initialState
  );

  const onClose = () => {
    router.push("/modules/inventory/products/category");
  }

  return (
    <Formik
      initialValues={{
        name: initialData.name,
        expense_account_id: initialData.expense_account.pk,
        income_account_id: initialData.income_account.pk,
      } as ProductCategory}
      validationSchema={productCategorySchema}
      onSubmit={(values) => {
        const formData = new FormData();

        formData.append("category_id", initialData.pk.toString());
        formData.append("name", values.name);
        formData.append("income_account_id", values.income_account_id.toString());
        formData.append("expense_account_id", values.expense_account_id.toString());

        updateCategoryAction(formData);
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
            isOpen={updateCategoryState.status === "success"}
            title="Product Category Updated"
            description={updateCategoryState.message}
            onClose={onClose}
          />

          {updateCategoryState.status === "error" && (
            <Alert status={"error"}
              fontSize={{ base: "sm", md: "xs" }}
              rounded={"md"}
              variant={'solid'}
            >
              <AlertIcon />
              {updateCategoryState.message}
            </Alert>
          )}
          <ModuleInventoryProductCategoryInformationEdit
            initialAccounts={initialAccounts}
            initialData={initialData}
          />
          <Flex justify={'end'}>
            <ModuleInventoryProductCategorySubmit />
          </Flex>
        </Flex>
      )}
    </Formik>
  )
}
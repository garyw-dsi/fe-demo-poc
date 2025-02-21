"use client"

import { Divider, Flex, FormControl, Radio, RadioGroup } from "@chakra-ui/react";
import ModuleInventoryProductFormLayout from "../layout";
import ModuleInventoryProductSetImage from "../image";
import { Field, useFormikContext } from "formik";
import { Products } from "@/libs/yup/inventory/product";
import { ModuleInput, ModuleInputErrorMessage, ModuleInputLabel, ModuleInputSelect } from "@/components/modules/input";
import ModuleTagSelect from "@/components/modules/core/tags/select";
import ModuleCurrencySelect from "@/components/modules/core/currency/select";
import { productTypes, units } from "@/constants/modules/inventory/products";
import { components } from "@/libs/api/schema/inventory";
import ModuleInventoryProductCategorySelect from "../../products-category/select";

interface Option {
  value: string;
  label: string;
}

interface Props {
  currency: Option[] | undefined;
  category: Option[] | undefined;
  setFile: (file: File | null) => void;
  initialProduct: components['schemas']['Product'];
}

export default function ModuleInventoryProductInformationEdit({
  category,
  currency,
  setFile,
  initialProduct
}: Props) {
  const { errors, touched, values } = useFormikContext<Products>();
  return (
    <ModuleInventoryProductFormLayout
      title="Product Information"
    >
      <Flex direction={'column'} gap={5}>
        <ModuleInventoryProductSetImage
          setFile={setFile}
        />
        <Divider />
        <FormControl>
          <ModuleInputLabel label="Product Type" />
          <Field name="product_type">
            {() => (
              <RadioGroup
                name="product_type"
                value={values.product_type}
                pb={3}
                isDisabled={true}
              >
                <Flex align="center" gap={5} flexWrap="wrap">
                  {productTypes.map((type) => (
                    <Radio key={type} value={type} size="sm">
                      {type}
                    </Radio>
                  ))}
                </Flex>
              </RadioGroup>
            )}
          </Field>
          <ModuleInputErrorMessage value={errors.product_type} />
        </FormControl>

        <FormControl
          isRequired
          isInvalid={!!errors.name && touched.name}
        >
          <ModuleInputLabel label="Product Name" />
          <Field
            as={ModuleInput}
            name="name"
            placeholder="Product Name"
          />
          <ModuleInputErrorMessage value={errors.name} />
        </FormControl>

        <Flex gap={5}>
          <FormControl
            isRequired
            isInvalid={!!errors.currency && touched.currency}
          >
            <ModuleInputLabel label="Currency" />
            <ModuleCurrencySelect
              datas={currency}
              fieldName="currency"
              placeholder="Select Currency..."
              defaultValues={{
                value: initialProduct?.currency?.pk.toString(),
                label: `${initialProduct?.currency.symbol} (${initialProduct?.currency?.name})`
              }}
            />
            <ModuleInputErrorMessage value={errors.currency} />
          </FormControl>

          <FormControl
            isInvalid={!!errors.price && touched.price}
          >
            <ModuleInputLabel label="Price" />
            <Field
              as={ModuleInput}
              name="price"
              placeholder="Price"
            />
            <ModuleInputErrorMessage value={errors.price} />
          </FormControl>
        </Flex>

        <Flex gap={5}>
          <FormControl
            isRequired
            isInvalid={!!errors.product_category_id && touched.product_category_id}
          >
            <ModuleInputLabel label="Product Category" />
            <ModuleInventoryProductCategorySelect
              initialOptions={category}
              fieldName="product_category_id"
              placeholder="Select Product Category..."
              defaultValue={{
                value: initialProduct.product_category.pk.toString(),
                label: initialProduct.product_category.name
              }}
            />
            <ModuleInputErrorMessage value={errors.product_category_id} />
          </FormControl>
          <FormControl
            isRequired
            isInvalid={!!errors.unit && touched.unit}
          >
            <ModuleInputLabel label="Product Unit" />
            <Field as={ModuleInputSelect} name="unit">
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </Field>
            <ModuleInputErrorMessage value={errors.unit} />
          </FormControl>
        </Flex>

        <FormControl
          isInvalid={!!errors.tags && Boolean(touched.tags)}
        >
          <ModuleInputLabel label="Product Tags" />
          <ModuleTagSelect
            placeholder="Select tag"
            fieldName="tags"
            defaultValue={initialProduct.tags.map((tag) => {
              return {
                label: tag.name,
                value: tag.pk.toString()
              }
            })}
          />
          <ModuleInputErrorMessage value={errors.tags as string} />
        </FormControl>
      </Flex>
    </ModuleInventoryProductFormLayout>
  )
}
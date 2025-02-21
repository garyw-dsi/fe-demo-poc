"use client";

import { Fragment, useRef, useState } from "react";
import { FieldArray, Field, useFormikContext, FieldProps, getIn } from "formik";
import { Button, Tr, Td, Icon, Flex, Text, useToast, FormControl, InputGroup, InputRightElement } from "@chakra-ui/react";
import ModuleSalesQuotationFormLayout from "../layout";
import ModuleInventoryProductSelect from "@/components/modules/inventory/products/select";
import ITableHeader from "@/components/table/header";
import { ModuleInput, ModuleInputErrorMessage, ModuleInputSelect } from "@/components/modules/input";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { formatStdCurrency } from "@/utils/currency";
import ITable from "@/components/table";
import ITableBody from "@/components/table/body";
import { CreateQuotation } from "@/libs/yup/sales/quotations";
import { components } from "@/libs/api/schema/inventory";
import { components as coreComponents } from "@/libs/api/schema/core-services";
import { components as salesComponents } from "@/libs/api/schema/sales";
import ModuleVATSelect from "@/components/modules/core/vat/select";
import { calculateItemQuotationTotal, calculateTotalQuotation } from "@/utils/sales/calculate-quotations";

const header: string[] = ["Items", "UOM", "Quantity", "Unit Price", "Discount", "VAT", "Total", ""];

type DiscountType = "nomine" | "percentage";
const discountTypes: DiscountType[] = ["nomine", "percentage"];

export default function ModuleSalesQuotationItemsEdit({
  initialData,
  vats
}: {
  initialData: salesComponents['schemas']['Quotation'];
  vats: {
    value: string;
    label: string;
    other: coreComponents['schemas']['VATOpt']
  }[] | undefined;
}) {
  const toast = useToast();

  const addItemsRef = useRef<() => void>(() => { })
  const { setFieldValue, values, errors, touched } = useFormikContext<CreateQuotation>();

  const [discountType, setDiscountType] = useState<{
    index: number;
    type: DiscountType;
  }[]>(initialData.items.map((item, index) => ({
    index, type: item.discount_rate ? "percentage" : "nomine"
  })));

  const formatCurrency = (price: number) =>
    formatStdCurrency({ currencyISO: "IDR", price });

  const {
    untaxedTotal,
    taxes,
    grandTotal,
    paymentDp,
    discount
  } = calculateTotalQuotation(values, discountType);

  const handleProductSelect = (
    index: number,
    product: {
      value: string;
      label: string;
      other: components['schemas']['ProductOpt']
    } | null
  ) => {
    if (product) {
      if (!product.other.price) {
        toast({
          title: "Product Error",
          description: "No price found on this product!",
          status: "warning"
        })
      }

      if (Number(product.other.stock) < 1) {
        return toast({
          title: "Product Error",
          description: "This product is out of stock!",
          status: "warning"
        });
      }

      setFieldValue(`items[${index}].product_id`, product.value);
      setFieldValue(`items[${index}].price`, Number(product.other.price) || 0);
      setFieldValue(`items[${index}].quantity`, 1);
      setFieldValue(`items[${index}].unit`, product.other.unit);

      return;
    }
  };

  const handleVATSelect = (
    index: number,
    vat: {
      value: string;
      label: string;
      other: coreComponents['schemas']['VATOpt']
    } | null
  ) => {
    if (vat) {
      setFieldValue(`items[${index}].vat_rate`, vat.other.rate || 0);

      return;
    }
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    setFieldValue(`items[${index}].quantity`, quantity);
  };

  const onChangeDiscountType = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const { value } = e.target;
    const type = value as DiscountType;

    setDiscountType((prev) => {
      const updated = prev ? [...prev] : [];
      const existingIndex = updated.findIndex((item) => item.index === index);

      if (existingIndex !== -1) {
        updated[existingIndex] = { index, type };
      } else {
        updated.push({ index, type });
      }

      return updated;
    });

    if (type === "nomine") {
      setFieldValue(`items[${index}].discount_rate`, null);
    }

    if (type === "percentage") {
      setFieldValue(`items[${index}].discount_amount`, null);
    }
  };

  return (
    <ModuleSalesQuotationFormLayout
      title="Quotation Items"
      action={
        <Button
          size="sm"
          fontSize="xs"
          colorScheme="blue"
          leftIcon={
            <Icon as={FaPlus} />
          }
          onClick={() => addItemsRef.current()}
        >
          Add Item
        </Button>
      }
    >
      <FieldArray name="items">
        {({ push, remove }) => {
          addItemsRef.current = () => {
            push({
              product_id: NaN,
              quantity: NaN,
              price: NaN,
              vat_id: NaN,
              vat_rate: NaN,
            });
          };
          return (
            <Fragment>
              {values.items.length > 0 && (
                <ITable variant="simple">
                  <ITableHeader headers={header} />
                  <ITableBody>
                    {values.items.map((item, index) => {
                      const { totalAfterGlobalDiscount } = calculateItemQuotationTotal(
                        item as never,
                        discountType?.find((type) => type.index === index)?.type,
                        values.discount_rate as number
                      );

                      return (
                        <Tr key={index}>
                          <Td w={{ base: "xl", lg: "sm" }}>
                            <ModuleInventoryProductSelect
                              fieldName={`items[${index}].product_id`}
                              placeholder="Select Product"
                              onProductSelect={(product) => handleProductSelect(index, product)}
                              defaultValue={
                                initialData.items[index]
                                  ? {
                                    value: initialData.items[index].product.pk.toString(),
                                    label: initialData.items[index].product.name,
                                    other: { ...initialData.items[index].product },
                                  }
                                  : undefined
                              }
                            />
                          </Td>
                          <Td w="32">{item.unit || "-"}</Td>
                          <Td w="32">
                            <Field name={`items[${index}].quantity`}>
                              {({ field }: FieldProps) => (
                                <ModuleInput
                                  {...field}
                                  type="number"
                                  placeholder="Quantity"
                                  min={1}
                                  isDisabled={!item.product_id}
                                  onChange={(e) =>
                                    handleQuantityChange(index, parseFloat(e.target.value) || 1)
                                  }
                                />
                              )}
                            </Field>
                          </Td>
                          <Td>
                            <Field name={`items[${index}].price`}>
                              {({ field }: FieldProps) => (
                                <ModuleInput
                                  {...field}
                                  type="number"
                                  placeholder="Price"
                                  min={0}
                                  isDisabled={!item.product_id}
                                />
                              )}
                            </Field>
                          </Td>
                          <Td>
                            {item.product_id
                              ? (
                                <Flex
                                  gap={2}
                                  w={'full'}
                                  direction={{ base: 'column', md: 'row' }}
                                >
                                  <FormControl>
                                    <ModuleInputSelect
                                      onChange={(e) => onChangeDiscountType(e, index)}
                                      defaultValue={discountType?.find((type) => type.index === index)?.type}
                                    >
                                      {discountTypes.map((type) => (
                                        <option key={type} value={type}>
                                          {type}
                                        </option>
                                      ))}
                                    </ModuleInputSelect>
                                  </FormControl>
                                  {discountType?.find((type) => type.index === index)?.type === "percentage"
                                    ? (
                                      <FormControl
                                        isInvalid={
                                          !!getIn(errors, `items[${index}].discount_rate`) &&
                                          !!getIn(touched, `items[${index}].discount_rate`)
                                        }
                                      >
                                        <InputGroup>
                                          <Field
                                            as={ModuleInput}
                                            name={`items[${index}].discount_rate`}
                                            placeholder="Discount Rate"
                                            min={0}
                                            max={100}
                                            isDisabled={!item.product_id}
                                          />
                                          <InputRightElement width='3rem'>
                                            %
                                          </InputRightElement>
                                        </InputGroup>
                                        <ModuleInputErrorMessage
                                          value={getIn(errors, `items[${index}].discount_rate`)}
                                        />
                                      </FormControl>
                                    )
                                    : (
                                      <FormControl
                                        isInvalid={
                                          !!getIn(errors, `items[${index}].discount_amount`) &&
                                          !!getIn(touched, `items[${index}].discount_amount`)
                                        }
                                      >
                                        <Field
                                          as={ModuleInput}
                                          name={`items[${index}].discount_amount`}
                                          placeholder="Discount Amount"
                                          min={0}
                                          isDisabled={!item.product_id}
                                        />
                                        <ModuleInputErrorMessage
                                          value={getIn(errors, `items[${index}].discount_amount`)}
                                        />
                                      </FormControl>
                                    )
                                  }
                                </Flex>
                              )
                              : "-"
                            }
                          </Td>
                          <Td>
                            {item.product_id ? (
                              <ModuleVATSelect
                                fieldName={`items[${index}].vat_id`}
                                placeholder="Select VAT"
                                initialOptions={vats}
                                onVATSelect={(vat) =>
                                  handleVATSelect(
                                    index,
                                    vat as unknown as {
                                      value: string;
                                      label: string;
                                      other: coreComponents["schemas"]["VATOpt"]
                                    } | null
                                  )
                                }
                                defaultValue={
                                  initialData.items[index]?.vat
                                    ? {
                                      value: initialData.items[index].vat.pk.toString(),
                                      label: Number(initialData.items[index].vat.rate) * 100 + "%",
                                    }
                                    : undefined
                                }
                              />
                            ) : (
                              "-"
                            )}
                          </Td>
                          <Td>
                            {formatCurrency(Number(totalAfterGlobalDiscount))}
                          </Td>
                          {values.items.length > 1 && (
                            <Td>
                              <Button
                                size="xs"
                                colorScheme="red"
                                variant="outline"
                                p={0}
                                onClick={() => remove(index)}
                              >
                                <Icon as={FaTrashAlt} boxSize={3} />
                              </Button>
                            </Td>
                          )}
                        </Tr>
                      )
                    })}
                  </ITableBody>
                </ITable>
              )}
            </Fragment>
          )
        }}
      </FieldArray>;


      {values.items.length > 0 && (
        <Flex justify="end" w="full" gap={5} mt={4}>
          <Flex direction="column" gap={2} textAlign="end">
            <Text fontSize="sm">Untaxed Total:</Text>
            <Text fontSize="sm">Discount:</Text>
            <Text fontSize="sm">Payment DP:</Text>
            <Text fontSize="sm">Taxes:</Text>
            <Text fontSize="sm" fontWeight="bold">
              Grand Total:
            </Text>
          </Flex>
          <Flex direction="column" gap={2} align="end">
            <Text fontSize="sm">{formatCurrency(untaxedTotal)}</Text>
            <Text fontSize="sm">- {formatCurrency(discount)}</Text>
            <Text fontSize="sm">{formatCurrency(paymentDp)}</Text>
            <Text fontSize="sm">{formatCurrency(taxes)}</Text>
            <Text fontSize="sm" fontWeight="bold">
              {formatCurrency(grandTotal)}
            </Text>
          </Flex>
        </Flex>
      )}
    </ModuleSalesQuotationFormLayout>
  )
}

"use client";

import { Fragment, useState } from "react";
import { Button, Tr, Td, Icon, Flex, Text, FormControl, InputGroup, InputRightElement } from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";
import { FieldArray, Field, useFormikContext, FieldProps, getIn } from "formik";

import { components } from "@/libs/api/schema/sales";
import { components as coreComponents } from "@/libs/api/schema/core-services";
import { formatStdCurrency } from "@/utils/currency";

import ITable from "@/components/table";
import ITableBody from "@/components/table/body";
import ITableHeader from "@/components/table/header";
import { ModuleInput, ModuleInputErrorMessage, ModuleInputSelect } from "@/components/modules/input";
import ModuleSalesInvoiceFormLayout from "../layout";
import { type CreateInvoice } from "@/libs/yup/sales/invoices";
import ModuleVATSelect from "@/components/modules/core/vat/select";

const header: string[] = ["Items", "UOM", "Quantity", "Unit Price", "Discount", "VAT", "Total", ""];

type DiscountType = "nomine" | "percentage";
const discountTypes: DiscountType[] = ["nomine", "percentage"];

export default function ModuleSalesInvoiceItemsCreate({
  initialData, vats
}: {
  initialData: components["schemas"]['Order'];
  vats: {
    value: string;
    label: string;
    other: coreComponents['schemas']['VATOpt']
  }[] | undefined;
}) {
  const { setFieldValue, values, errors, touched } = useFormikContext<CreateInvoice>();

  const [discountType, setDiscountType] = useState<{
    index: number;
    type: DiscountType;
  }[] | undefined>(initialData?.items.map((item, index) => ({
    index, type: item.discount_rate ? "percentage" : "nomine"
  })));

  const formatCurrency = (price: number) =>
    formatStdCurrency({ currencyISO: "IDR", price });

  const calculateTotals = () => {
    const untaxedTotal = values.items.reduce((sum, item) => {
      return sum + (item.price || 0) * (item.quantity || 0);
    }, 0);

    const taxes = values.items.reduce((sum, item) => {
      return sum + (item.price || 0) * (item.quantity || 0) * (item.vat_rate || 0);
    }, 0);

    const discountRate = values.items.reduce((sum, item) => {
      return sum + Number(item.discount_rate || 0) * (Number(item.price || 0) * Number(item.quantity || 0)) / 100;
    }, 0);

    const discountNomine = values.items.reduce((sum, item) => {
      return sum + Number(item.discount_amount || 0);
    }, 0);

    const discount = Number(discountRate) + Number(discountNomine);

    const grandTotal = untaxedTotal + taxes - discount;

    return {
      untaxedTotal,
      taxes,
      grandTotal,
      discount
    };
  };

  const { untaxedTotal, taxes, grandTotal, discount } = calculateTotals();

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
    <ModuleSalesInvoiceFormLayout
      title="Order Items"
    >
      <FieldArray
        name="items"
        render={(arrayHelpers) => (
          <Fragment>
            {values.items.length > 0 && (
              <ITable variant={'simple'}>
                <ITableHeader headers={header} />
                <ITableBody>
                  {values.items.map((item, index) => (
                    <Tr key={index}>
                      <Td>
                        <Text fontSize="sm">
                          {initialData.items.find((i) => i.pk === item.order_item_id)?.product.name}
                        </Text>
                      </Td>
                      <Td w={"32"}>
                        {initialData.items.find((i) => i.pk === item.order_item_id)?.product.unit}
                      </Td>

                      <Td w={"32"}>
                        <Field name={`items[${index}].quantity`}>
                          {({ field }: FieldProps) => (
                            <ModuleInput
                              {...field}
                              type="number"
                              placeholder="Quantity"
                              min={1}
                              onChange={(e) =>
                                handleQuantityChange(index, parseFloat(e.target.value) || 0)
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
                            />
                          )}
                        </Field>
                      </Td>
                      <Td>
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
                                />
                                <ModuleInputErrorMessage
                                  value={getIn(errors, `items[${index}].discount_amount`)}
                                />
                              </FormControl>
                            )
                          }
                        </Flex>
                      </Td>
                      <Td>
                        <ModuleVATSelect
                          fieldName={`items[${index}].vat_id`}
                          placeholder="Select VAT"
                          initialOptions={vats}
                          onVATSelect={(vat) =>
                            handleVATSelect(index, vat as unknown as { value: string; label: string; other: coreComponents["schemas"]["VATOpt"] } | null)
                          }
                          defaultValue={
                            initialData?.items[index]?.vat
                              ? {
                                value: initialData.items[index].vat.pk.toString(),
                                label: Number(initialData.items[index].vat.rate) * 100 + "%",
                              }
                              : undefined
                          }
                        />
                      </Td>
                      <Td>
                        {formatCurrency(item.quantity * item.price)}
                      </Td>

                      {values.items.length > 1 && (
                        <Td>
                          <Button
                            size="xs"
                            colorScheme="red"
                            variant="outline"
                            p={0}
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            <Icon as={FaTrashAlt} boxSize={3} />
                          </Button>
                        </Td>
                      )}
                    </Tr>
                  ))}
                </ITableBody>
              </ITable>
            )}
          </Fragment>
        )}
      />

      {values.items.length > 0 && (
        <Flex justify="end" w="full" gap={5} mt={4}>
          <Flex direction="column" gap={2} textAlign="end">
            <Text fontSize="sm">Untaxed Total:</Text>
            <Text fontSize="sm">Discount:</Text>
            <Text fontSize="sm">Taxes:</Text>
            <Text fontSize="sm" fontWeight="bold">
              Grand Total:
            </Text>
          </Flex>
          <Flex direction="column" gap={2} align="end">
            <Text fontSize="sm">{formatCurrency(untaxedTotal)}</Text>
            <Text fontSize="sm">- {formatCurrency(discount)}</Text>
            <Text fontSize="sm">{formatCurrency(taxes)}</Text>
            <Text fontSize="sm" fontWeight="bold">
              {formatCurrency(grandTotal)}
            </Text>
          </Flex>
        </Flex>
      )}
    </ModuleSalesInvoiceFormLayout>
  )
}

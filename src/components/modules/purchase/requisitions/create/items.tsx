"use client";

import { Fragment, useRef } from "react";
import { FieldArray, Field, useFormikContext, FieldProps } from "formik";
import { Button, Tr, Td, Icon, Flex, Text, useToast } from "@chakra-ui/react";
import ModuleInventoryProductSelect from "@/components/modules/inventory/products/select";
import ITableHeader from "@/components/table/header";
import { ModuleInput } from "@/components/modules/input";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { formatStdCurrency } from "@/utils/currency";
import ITable from "@/components/table";
import ITableBody from "@/components/table/body";
import { type CreateRequisition } from "@/libs/yup/purchase/requisition";
import ModulePurchaseRequisitionFormLayout from "../layout";

const header: string[] = ["Items", "UOM", "Quantity", "Unit Price", "VAT", "Total", ""];

export default function ModulePurchaseRequisitionItemsCreate() {
  const toast = useToast();

  const addItemsRef = useRef<HTMLButtonElement>(null);
  const { setFieldValue, values } = useFormikContext<CreateRequisition>();

  const formatCurrency = (price: number) =>
    formatStdCurrency({ currencyISO: "IDR", price });

  const calculateTotals = () => {
    const untaxedTotal = values.items.reduce((sum, item) => {
      return sum + (item.price || 0) * (item.quantity || 0);
    }, 0);

    const taxes = values.items.reduce((sum, item) => {
      return sum + (item.price || 0) * (item.quantity || 0) * (item.vat || 0);
    }, 0);

    return {
      untaxedTotal,
      taxes,
      grandTotal: untaxedTotal + taxes,
    };
  };

  const { untaxedTotal, taxes, grandTotal } = calculateTotals();

  const handleProductSelect = (
    index: number,
    product: { value: string; label: string; price: number | null } | null
  ) => {
    if (product) {
      if (!product.price) {
        return toast({
          title: "Product Error",
          description: "No price found on this product!",
          status: "warning"
        })
      }

      setFieldValue(`items[${index}].product_id`, product.value);
      setFieldValue(`items[${index}].price`, product.price || 0);
      setFieldValue(`items[${index}].vat`, 0.11);
      setFieldValue(`items[${index}].quantity`, 1);
    } else {
      setFieldValue(`items[${index}].product_id`, "");
      setFieldValue(`items[${index}].quantity`, 0);
      setFieldValue(`items[${index}].price`, 0);
      setFieldValue(`items[${index}].vat`, 0);
    }
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    setFieldValue(`items[${index}].quantity`, quantity);
  };

  return (
    <ModulePurchaseRequisitionFormLayout
      title="Requisition Items"
      action={
        <Button
          size="sm"
          fontSize="xs"
          colorScheme="blue"
          leftIcon={
            <Icon as={FaPlus} />
          }
          onClick={() => addItemsRef.current?.click()}
        >
          Add Item
        </Button>
      }
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
                      <Td w={{ base: 'xl', lg: "lg" }}>
                        <ModuleInventoryProductSelect
                          fieldName={`items[${index}].product_id`}
                          placeholder="Select Product"
                          onProductSelect={(product) => handleProductSelect(index, product)}
                        />
                      </Td>
                      <Td w={"32"}>
                        PCS
                      </Td>

                      <Td w={"32"}>
                        <Field name={`items[${index}].quantity`}>
                          {({ field }: FieldProps) => (
                            <ModuleInput
                              {...field}
                              type="number"
                              placeholder="Quantity"
                              min={1}
                              isDisabled={!item.product_id}
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
                              isDisabled={!item.product_id}
                            />
                          )}
                        </Field>
                      </Td>
                      <Td>{item.vat ? `${(item.vat * 100).toFixed(0)}%` : "-"}</Td>
                      <Td>
                        {item.price && item.quantity
                          ? formatCurrency(item.price * item.quantity)
                          : "-"}
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
            <Button
              ref={addItemsRef}
              onClick={() =>
                arrayHelpers.push({
                  product_id: "",
                  quantity: 0,
                  price: 0,
                  vat: 0.11,
                })
              }
              display="none"
              hidden
            />
          </Fragment>
        )}
      />

      {values.items.length > 0 && (
        <Flex justify="end" w="full" gap={5} mt={4}>
          <Flex direction="column" gap={2} textAlign="end">
            <Text fontSize="sm">Untaxed Total:</Text>
            <Text fontSize="sm">Taxes:</Text>
            <Text fontSize="sm" fontWeight="bold">
              Grand Total:
            </Text>
          </Flex>
          <Flex direction="column" gap={2} align="end">
            <Text fontSize="sm">{formatCurrency(untaxedTotal)}</Text>
            <Text fontSize="sm">{formatCurrency(taxes)}</Text>
            <Text fontSize="sm" fontWeight="bold">
              {formatCurrency(grandTotal)}
            </Text>
          </Flex>
        </Flex>
      )}
    </ModulePurchaseRequisitionFormLayout>
  )
}

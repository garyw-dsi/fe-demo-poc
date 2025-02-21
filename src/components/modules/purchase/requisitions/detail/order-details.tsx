"use client";

import ITable, { TD, TR } from "@/components/table";
import ITableBody from "@/components/table/body";
import ITableHeader from "@/components/table/header";
import { Flex, Tag, Text } from "@chakra-ui/react";
import { components } from "@/libs/api/schema/sales";
import ModulePurchaseRequisitionFormLayout from "../layout";

const tableHeaders = [
  "Line",
  "Product",
  "UOM",
  "Quantity",
  "Unit Price",
  "Discount",
  "TAX",
  "Sub Total (Excl Tax)",
];

export default function ModulePurchaseRequisitionOrderDetail({
  datas,
}: {
  datas: components['schemas']['Quotation']
}) {
  const untaxedTotal = datas.items.reduce(
    (acc, item) =>
      acc + Number(item.price) * item.quantity * (1 - (item.discount_rate || 0)),
    0
  );

  const totalTaxes = datas.items.reduce(
    (acc, item) =>
      acc +
      Number(item.price) *
      item.quantity *
      (1 - (item.discount_rate || 0)) *
      item.vat.rate,
    0
  );

  const grandTotal = untaxedTotal + totalTaxes;

  return (
    <ModulePurchaseRequisitionFormLayout title="Requisition Detail">
      <ITable>
        <ITableHeader headers={tableHeaders} />
        <ITableBody>
          {datas.items.map((data, index) => (
            <TR key={index}>
              <TD>{index + 1}</TD>
              <TD>{data.product.name}</TD>
              <TD>PCS</TD>
              <TD>{data.quantity}</TD>
              <TD>
                {Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(Number(data.price))}
              </TD>
              <TD>
                <Tag fontSize={"xs"} size={"sm"} colorScheme="red">
                  {((data.discount_rate || 0) * 100).toFixed(2)}%
                </Tag>
              </TD>
              <TD>
                <Tag fontSize={"xs"} size={"sm"} colorScheme="teal">
                  {data.vat.rate * 100}%
                </Tag>
              </TD>
              <TD>
                {Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(
                  Number(data.price) *
                  data.quantity *
                  (1 - (data.discount_rate || 0))
                )}
              </TD>
            </TR>
          ))}
        </ITableBody>
      </ITable>
      <Flex justify={"end"} w={"full"} gap={5}>
        <Flex direction={"column"} gap={2} textAlign={'end'}>
          <Text fontSize={'sm'}>Untaxed Total:</Text>
          <Text fontSize={'sm'}>Taxes:</Text>
          <Text fontSize={'sm'} fontWeight={"bold"}>Grand Total:</Text>
        </Flex>
        <Flex direction={"column"} gap={2} align={"end"}>
          <Text fontSize={'sm'}>
            {Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(untaxedTotal)}
          </Text>
          <Text fontSize={'sm'}>
            {Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(totalTaxes)}
          </Text>
          <Text fontSize={'sm'} fontWeight={"bold"}>
            {Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(grandTotal)}
          </Text>
        </Flex>
      </Flex>
    </ModulePurchaseRequisitionFormLayout>
  )
}

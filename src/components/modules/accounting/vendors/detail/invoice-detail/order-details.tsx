"use client";

import ITable, { TD, TR } from "@/components/table";
import ITableBody from "@/components/table/body";
import ITableHeader from "@/components/table/header";
import { Flex, Tag, Text } from "@chakra-ui/react";
import { OrderDetails } from "../type.static";
import ModuleAccountingVendorFormLayout from "../../layout";

const tableHeaders = [
  "Product ID",
  "Product",
  "Quantity",
  "Unit Price",
  "TAX",
  "Sub Total (Excl Tax)",
];

export default function ModuleAccountingVendorOrderDetail({
  datas,
}: {
  datas: OrderDetails[];
}) {
  const untaxedTotal = datas.reduce(
    (acc, item) =>
      acc + Number(item.unit_price) * item.quantity * 1,
    0
  );

  const totalTaxes = datas.reduce(
    (acc, item) =>
      acc +
      Number(item.unit_price) *
      item.quantity *
      item.tax,
    0
  );

  const grandTotal = untaxedTotal + totalTaxes;

  return (
    <ModuleAccountingVendorFormLayout title="Purchase Order Detail">
      <ITable>
        <ITableHeader headers={tableHeaders} />
        <ITableBody>
          {datas.map((data, index) => (
            <TR key={index}>
              <TD>{data.product_id}</TD>
              <TD>{data.product_name}</TD>
              <TD>{data.quantity}</TD>
              <TD>
                {Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(Number(data.unit_price))}
              </TD>
              <TD>
                <Tag fontSize={"xs"} size={"sm"} colorScheme="teal">
                  {data.tax * 100}%
                </Tag>
              </TD>
              <TD>
                {Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(
                  Number(data.unit_price) * data.quantity
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
    </ModuleAccountingVendorFormLayout>
  )
}

"use client";

import ITable, { TD, TR } from "@/components/table";
import ITableBody from "@/components/table/body";
import ITableHeader from "@/components/table/header";
import { Flex, Tag, Text } from "@chakra-ui/react";
import { components } from "@/libs/api/schema/sales";
import ModuleSalesQuotationFormLayout from "../layout";
import { formatStdCurrency } from "@/utils/currency";

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

export default function ModuleSalesInvoiceDetail({
  datas,
}: {
  datas: components['schemas']['Invoice'];
}) {
  const formatCurrency = (price: number) =>
    formatStdCurrency({ currencyISO: "IDR", price });

  const calculateTotals = () => {
    const untaxedTotal = Number(datas.total_net);

    const taxes = Number(datas.total_vat);

    const discount = Number(datas.total_discount);

    const grandTotal = Number(datas.total);

    return {
      untaxedTotal,
      taxes,
      grandTotal,
      discount
    };
  };

  const { untaxedTotal, taxes, grandTotal, discount } = calculateTotals();

  return (
    <ModuleSalesQuotationFormLayout title="Sales Order Detail">
      <ITable>
        <ITableHeader headers={tableHeaders} />
        <ITableBody>
          {datas.items.map((data, index) => (
            <TR key={index}>
              <TD>{index + 1}</TD>
              <TD>{data.order_item.product.name}</TD>
              <TD>{data.order_item.product.unit}</TD>
              <TD>{Number(data.quantity)}</TD>
              <TD>
                {Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(Number(data.price))}
              </TD>
              <TD>
                {data.discount_amount
                  ? (
                    <Tag fontSize={"xs"} size={"sm"} colorScheme="red">
                      {Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(Number(data.discount_amount))}
                    </Tag>
                  )
                  : "-"
                }
              </TD>
              <TD>
                <Tag fontSize={"xs"} size={"sm"} colorScheme="teal">
                  {Number(data.vat_rate) * 100}%
                </Tag>
              </TD>
              <TD>
                {formatStdCurrency({
                  price: Number(data.total_net),
                  currencyISO: "IDR",
                })}
              </TD>
            </TR>
          ))}
        </ITableBody>
      </ITable>
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
    </ModuleSalesQuotationFormLayout>
  )
}

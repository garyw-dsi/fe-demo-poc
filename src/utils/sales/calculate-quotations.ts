import { CreateQuotation } from "@/libs/yup/sales/quotations";

export type DiscountType = "nomine" | "percentage";

export interface CalculationValues {
  items: CreateQuotation['items'];
  discount_rate?: CreateQuotation['discount_rate'];
  payment_dp?: CreateQuotation['payment_dp'];
  payment_dp_rate?: CreateQuotation['payment_dp_rate'];
}

interface Item {
  price: number;
  quantity: number;
  discount_rate: number;
  discount_amount: number;
  vat_rate: number;
}

export function calculateItemQuotationTotal(
  item: Item,
  discountItem?: DiscountType,
  globalDiscountRate?: number
) {
  const totalUntax = Number(item.price) * Number(item.quantity);

  const discountAmount =
    discountItem === "percentage"
      ? totalUntax * (Number(item.discount_rate) / 100)
      : Number(item.discount_amount || 0);

  const totalAfterDiscount = totalUntax - discountAmount;
  const totalAfterGlobalDiscount = totalAfterDiscount - totalAfterDiscount * (Number(globalDiscountRate || 0) / 100);
  const taxAmount = totalAfterGlobalDiscount * (Number(item.vat_rate || 0));

  return {
    totalUntax,
    discountAmount,
    totalAfterDiscount,
    totalAfterGlobalDiscount,
    taxAmount,
    grandTotal: totalAfterGlobalDiscount + taxAmount,
  };
}

export function calculateTotalQuotation(
  values: CalculationValues,
  discountType?: { index: number; type: DiscountType }[]
) {
  const untaxedTotal = values.items
    .map((item, index) => {
      const discountItem = discountType?.find((type) => type.index === index)?.type;
      const totalUntax = Number(item.price) * Number(item.quantity);

      const discountAmount =
        discountItem === "percentage"
          ? totalUntax * (Number(item.discount_rate) / 100)
          : Number(item.discount_amount || 0);

      const totalAfterDiscount = totalUntax - discountAmount;
      const totalAfterGlobalDiscount =
        totalAfterDiscount - totalAfterDiscount * (Number(values.discount_rate || 0) / 100);

      return totalAfterGlobalDiscount;
    })
    .reduce((sum, total) => sum + total, 0);

  const taxes = values.items
    .map((item, index) => {
      const discountItem = discountType?.find((type) => type.index === index)?.type;
      const totalUntax = Number(item.price) * Number(item.quantity);

      const discountAmount =
        discountItem === "percentage"
          ? totalUntax * (Number(item.discount_rate) / 100)
          : Number(item.discount_amount || 0);

      const totalAfterDiscount = totalUntax - discountAmount;
      const totalAfterGlobalDiscount =
        totalAfterDiscount - totalAfterDiscount * (Number(values.discount_rate || 0) / 100);

      return totalAfterGlobalDiscount * (Number(item.vat_rate || 0));
    })
    .reduce((sum, total) => sum + total, 0);

  const discountPerItem = values.items.reduce((sum, item) => {
    return sum + (Number(item.discount_rate || 0) / 100) * (Number(item.price || 0) * Number(item.quantity || 0));
  }, 0);

  const discountNomine = values.items.reduce((sum, item) => {
    return sum + Number(item.discount_amount || 0);
  }, 0);

  const globalDiscountRate = Number(values.discount_rate || 0) / 100;
  const globalDiscount = untaxedTotal * globalDiscountRate;

  const discountTotal = globalDiscount === untaxedTotal ? globalDiscount : discountPerItem + discountNomine + globalDiscount;

  const paymentDpNomine = Number(values.payment_dp || 0);
  const paymentDpRate = Number(untaxedTotal) * (Number(values.payment_dp_rate || 0) / 100);

  const paymentDp = values.payment_dp_rate ? Number(paymentDpRate) : Number(paymentDpNomine);

  const grandTotal = Math.max(0, untaxedTotal + taxes);

  return {
    untaxedTotal,
    taxes,
    grandTotal,
    paymentDp,
    discount: discountTotal
  };
}

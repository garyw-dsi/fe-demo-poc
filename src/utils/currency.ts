export const formatStdCurrency = ({
  currencyISO,
  price
}: {
  currencyISO: string;
  price: number;
}) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: currencyISO,
  });

  return formatter.format(price);
};
export const viewStandardVATRate = ({ 
  rate
}: { rate: number }) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return formatter.format(rate);
}
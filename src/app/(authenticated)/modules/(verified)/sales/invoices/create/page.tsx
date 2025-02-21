import { getAllOrders } from "@/app/actions/modules/sales/orders";
import ModuleSalesInvoiceCreateModal from "@/components/modules/sales/invoices/create/modal";

export const dynamic = 'force-dynamic';

export default async function ModuleSalesInvoicesCreatePage() {
  const { data } = await getAllOrders({
    page: 1,
    page_size: 20,
    status: "Issued"
  });

  return (
    <ModuleSalesInvoiceCreateModal
      initialOrder={data?.items.map((d) => {
        return {
          value: d.pk.toString(),
          label: d.order_id
        }
      }) || []}
    />
  )
}
import { getInitialOrderOptions } from "@/app/actions/modules/purchase/orders";
import ModulePurchaseInvoicesCreateForm from "@/components/modules/purchase/invoices/create";

export const dynamic = 'force-dynamic';

export default async function ModulePurchaseInvoicesCreatePage() {
  const data = await getInitialOrderOptions({ limit: 20 });

  return (
    <ModulePurchaseInvoicesCreateForm
      initialOrder={
        data?.map((item) => ({
          value: item.order_id.toString(),
          label: `${item.order_id} - (${item.customer_name})`
        })) || []
      }
    />
  )
}
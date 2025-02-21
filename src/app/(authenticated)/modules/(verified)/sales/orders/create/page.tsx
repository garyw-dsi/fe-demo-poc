import { getAllCurrencyOption } from "@/app/actions/modules/core/currency";
import { getAllVat } from "@/app/actions/modules/core/vat";
import { getAllCustomers, getCustomer } from "@/app/actions/modules/crm/customers";
import MainModuleHeader from "@/components/modules/main/header";
import ModuleSalesOrderCreateForm from "@/components/modules/sales/orders/create/form";
import ModuleSalesOrderMenuActionBack from "@/components/modules/sales/orders/menu-action/action-back";
import { components } from "@/libs/api/schema/crm";
import { Flex } from "@chakra-ui/react";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: {
    customer_id?: string;
  }
}

interface Option {
  value: string;
  label: string;
}

interface CustomerOption extends Option {
  other: components['schemas']['Customer'];
}

interface InitialData {
  customer: CustomerOption | undefined;
}

export default async function ModuleSalesOrderCreatePage({ searchParams }: PageProps) {
  const customer_id = searchParams.customer_id || undefined;

  const initialData: InitialData = {
    customer: undefined,
  }

  if (customer_id) {
    const { status, data } = await getCustomer({ pk: Number(customer_id) });

    if (status === "error" || !data) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete("customer_id");

      return redirect(`?${newSearchParams.toString()}`);
    }

    initialData.customer = {
      value: data.customer.pk.toString(),
      label: data.customer.contact.name,
      other: data.customer
    }
  }

  const { data: currency } = await getAllCurrencyOption();
  const { data: vats } = await getAllVat({ page: 1, page_size: 20 });
  const { data: customers } = await getAllCustomers({ page: 1, page_size: 20 });

  const [initialCurrency, initialVat, initialCustomer] = [
    currency?.map((data) => {
      return { value: data.pk.toString(), label: `${data.symbol} (${data.name})` }
    }),
    vats?.items.map((data) => {
      return { value: data.pk.toString(), label: data.rate * 100 + "%", other: data }
    }),
    customers?.items.map((data) => {
      return { value: data.pk.toString(), label: data.contact.name }
    })
  ]

  return (
    <Flex
      w={'full'}
      direction={'column'}
      p={5}
      gap={5}
      flex={1}
    >
      <MainModuleHeader
        title="Create Order"
        withViewHelper={false}
        actions={<ModuleSalesOrderMenuActionBack />}
      />

      <ModuleSalesOrderCreateForm
        currency={initialCurrency}
        vats={initialVat}
        customers={initialCustomer}
        selectedCustomer={initialData.customer}
      />
    </Flex>
  )
}
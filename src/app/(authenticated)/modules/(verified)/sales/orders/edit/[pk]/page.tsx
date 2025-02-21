import { getAllCurrencyOption } from "@/app/actions/modules/core/currency";
import { getAllVat } from "@/app/actions/modules/core/vat";
import { getAllCustomers, getCustomer } from "@/app/actions/modules/crm/customers";
import { getOrder } from "@/app/actions/modules/sales/orders";
import ModuleError from "@/components/modules/error";
import MainModuleHeader from "@/components/modules/main/header";
import ModuleSalesOrderDetailHistory from "@/components/modules/sales/orders/detail/history";
import ModuleSalesOrderEditForm from "@/components/modules/sales/orders/edit/form";
import ModuleSalesOrderMenuActionBack from "@/components/modules/sales/orders/menu-action/action-back";
import { components } from "@/libs/api/schema/crm";
import { Flex } from "@chakra-ui/react";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    pk: string;
  };
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

export default async function ModuleSalesOrderEditPage({ params, searchParams }: PageProps) {
  const pk = Number(params.pk);

  if (!pk) {
    redirect("/modules/sales/orders");
  }

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

  const { data, message, status } = await getOrder({ pk });

  if (status === 'error') {
    return <ModuleError message={message as string} />
  }

  if (data?.status !== "Draft") {
    redirect(`/modules/sales/orders/detail/${pk}`);
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
        title="Edit Order"
        withViewHelper={false}
        actions={<ModuleSalesOrderMenuActionBack />}
      />

      {data && (
        <Flex
          flex={1}
          justify={"space-between"}
          direction={{ base: "column" }}
          gap={10}
        >
          <Flex
            direction={"column"}
            w={{ base: 'full' }}
            maxW={{ base: 'full' }}
            gap={5}
          >
            <ModuleSalesOrderEditForm
              initialData={data}
              currency={initialCurrency}
              vats={initialVat}
              customers={initialCustomer}
            />
          </Flex>
          <ModuleSalesOrderDetailHistory history={data} />
        </Flex>
      )}
    </Flex>
  )
}
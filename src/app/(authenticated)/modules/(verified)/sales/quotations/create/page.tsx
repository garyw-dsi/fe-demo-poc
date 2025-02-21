import { redirect } from "next/navigation";
import { Flex } from "@chakra-ui/react";

import { getAllCurrencyOption } from "@/app/actions/modules/core/currency";
import { getAllVat } from "@/app/actions/modules/core/vat";
import { getAllCustomers, getCustomer } from "@/app/actions/modules/crm/customers";
import { getAllLeads, getLead } from "@/app/actions/modules/crm/leads";
import { components } from "@/libs/api/schema/crm";

import MainModuleHeader from "@/components/modules/main/header";
import ModuleSalesQuotationCreateForm from "@/components/modules/sales/quotations/create/form";
import ModuleSalesQuotationMenuActionBack from "@/components/modules/sales/quotations/menu-action/action-back";

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: {
    customer_id?: string;
    lead_id?: string;
  }
}

interface Option {
  value: string;
  label: string;
}

interface LeadOption extends Option {
  other: components['schemas']['Lead']
}

interface CustomerOption extends Option {
  other: components['schemas']['Customer']
}

interface InitialData {
  customer: CustomerOption | undefined;
  lead: LeadOption | undefined;
}

export default async function ModuleSalesQuotationCreatePage({ searchParams }: PageProps) {
  const customer_id = searchParams.customer_id || undefined;
  const lead_id = Number(searchParams.lead_id) || undefined;

  const initialData: InitialData = {
    customer: undefined,
    lead: undefined
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

  if (lead_id) {
    const { status, data } = await getLead({ pk: lead_id });

    if (status === "error" || !data) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete("lead_id");

      return redirect(`?${newSearchParams.toString()}`);
    }

    initialData.lead = {
      value: data.pk.toString(),
      label: data.name,
      other: data
    }
  }

  const { data: currency } = await getAllCurrencyOption();
  const { data: customers } = await getAllCustomers({ page: 1, page_size: 20 });
  const { data: leads } = await getAllLeads({ page: 1, page_size: 20, customer_id: customer_id });
  const { data: vats } = await getAllVat({ page: 1, page_size: 20 });

  const [initialCurrency, initialCustomers, initialLeads, initialVats] = [
    currency?.map((data) => {
      return { value: data.pk.toString(), label: `${data.symbol} (${data.name})` }
    }),
    customers?.items.map((data) => {
      return { value: data.pk.toString(), label: data.contact.name }
    }),
    leads?.items.map((data) => {
      return { value: data.pk.toString(), label: data.name, other: data }
    }),
    vats?.items.map((data) => {
      return { value: data.pk.toString(), label: data.rate * 100 + "%", other: data }
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
        title="Create Quotation"
        withViewHelper={false}
        actions={<ModuleSalesQuotationMenuActionBack />}
      />
      <ModuleSalesQuotationCreateForm
        currency={initialCurrency}
        customers={initialCustomers}
        leads={initialLeads}
        vats={initialVats}
        initialData={initialData}
      />
    </Flex>
  )
}
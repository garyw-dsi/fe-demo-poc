import { getAllCurrencyOption } from "@/app/actions/modules/core/currency";
import { getAllVat } from "@/app/actions/modules/core/vat";
import { getAllCustomers, getCustomer } from "@/app/actions/modules/crm/customers";
import { getAllLeads, getLead } from "@/app/actions/modules/crm/leads";
import { getQuotations } from "@/app/actions/modules/sales/quotations";
import ModuleError from "@/components/modules/error";
import MainModuleHeader from "@/components/modules/main/header";
import ModuleSalesQuotationDetailHistory from "@/components/modules/sales/quotations/detail/history";
import ModuleSalesQuotationEditForm from "@/components/modules/sales/quotations/edit/form";
import ModuleSalesQuotationMenuActionBack from "@/components/modules/sales/quotations/menu-action/action-back";
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

export default async function ModuleSalesQuotationEditPage({ params, searchParams }: PageProps) {
  const pk = Number(params.pk);

  if (!pk) {
    redirect("/modules/sales/quotations");
  }

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

  const { data, message, status } = await getQuotations({ pk });

  if (status === 'error') {
    return <ModuleError message={message as string} />
  }

  if (data?.status !== "Draft") {
    redirect(`/modules/sales/quotations/detail/${pk}`);
  }

  const { data: currency } = await getAllCurrencyOption();
  const { data: customers } = await getAllCustomers({ page: 1, page_size: 20 });
  const { data: vats } = await getAllVat({ page: 1, page_size: 20 });
  const { data: leads } = await getAllLeads({
    page: 1,
    page_size: 20,
    customer_id: customer_id || data.lead?.customer?.pk.toString() as string
  });

  const [initialCurrency, initialCustomers, initialVats, initialLeads] = [
    currency?.map((data) => {
      return { value: data.pk.toString(), label: `${data.symbol} (${data.name})` }
    }),
    customers?.items.map((data) => {
      return { value: data.pk.toString(), label: data.contact.name }
    }),
    vats?.items.map((data) => {
      return { value: data.pk.toString(), label: data.rate * 100 + "%", other: data }
    }),
    leads?.items.map((data) => {
      return { value: data.pk.toString(), label: data.name, other: data }
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
        title="Edit Quotation"
        withViewHelper={false}
        actions={<ModuleSalesQuotationMenuActionBack />}
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
            <ModuleSalesQuotationEditForm
              initialData={data}
              currency={initialCurrency}
              vats={initialVats}
              leads={initialLeads}
              initialParamsData={initialData}
              customers={initialCustomers}
            />
          </Flex>
          <ModuleSalesQuotationDetailHistory history={data} />
        </Flex>
      )}
    </Flex>
  )
}
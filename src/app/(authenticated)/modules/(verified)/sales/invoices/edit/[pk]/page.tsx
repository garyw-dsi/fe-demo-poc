import { redirect } from "next/navigation";
import { getAllVat } from "@/app/actions/modules/core/vat";
import { getInvoice } from "@/app/actions/modules/sales/invoices";
import { Flex } from "@chakra-ui/react";

import ModuleError from "@/components/modules/error";
import MainModuleHeader from "@/components/modules/main/header";
import ModuleSalesInvoiceDetailHistory from "@/components/modules/sales/invoices/detail/history";
import ModuleSalesInvoiceMenuActionBack from "@/components/modules/sales/invoices/menu-action/action-back";
import ModuleSalesInvoiceEditForm from "@/components/modules/sales/invoices/edit/form";

export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    pk: string;
  }
}

export default async function ModuleSalesInvoiceEditPage({ params }: PageProps) {
  const pk = Number(params.pk);

  if (!pk) {
    redirect("/modules/sales/invoices");
  }

  const { data, message, status } = await getInvoice({ pk });
  const { data: vats } = await getAllVat({ page: 1, page_size: 20 });

  if (status === 'error') {
    return <ModuleError message={message as string} />
  }

  if (data?.status !== "Draft") {
    redirect(`/modules/sales/invoices/detail/${pk}`);
  }

  return (
    <Flex
      w={'full'}
      direction={'column'}
      p={5}
      gap={5}
      flex={1}
    >

      <MainModuleHeader
        title="Edit Invoice"
        withViewHelper={false}
        actions={<ModuleSalesInvoiceMenuActionBack />}
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
            {data && (
              <ModuleSalesInvoiceEditForm
                initialData={data}
                vats={vats?.items.map((data) => {
                  return {
                    value: data.pk.toString(),
                    label: data.rate * 100 + "%",
                    other: data
                  }
                })}
              />
            )}
          </Flex>
          <ModuleSalesInvoiceDetailHistory history={data} />
        </Flex>
      )}
    </Flex>
  )
}
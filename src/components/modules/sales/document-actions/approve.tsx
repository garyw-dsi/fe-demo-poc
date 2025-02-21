"use client";

import { salesInvoiceApprove } from "@/app/actions/modules/sales/invoices";
import { salesOrderApprove } from "@/app/actions/modules/sales/orders";
import { salesQuotationApprove } from "@/app/actions/modules/sales/quotations";
import { Button, ButtonProps, Icon, useToast } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";

type Modules = "quotation" | "invoice" | "order";

interface Props extends ButtonProps {
  module: Modules;
}

const getActionHandler = (module: Modules) => {
  switch (module) {
    case "quotation":
      return salesQuotationApprove;
    case "invoice":
      return salesInvoiceApprove;
    case "order":
      return salesOrderApprove;
    default:
      throw new Error("Invalid module type");
  }
};

export default function ModuleSalesApproveAction({ module, ...props }: Props) {
  const params = useParams();
  const toast = useToast();
  const pk = Number(params.pk);

  const [loading, setLoading] = useState<boolean>(false);

  const title = {
    quotation: "Approve Quotation",
    invoice: "Approve Invoice",
    order: "Approve Order",
  }[module];

  const onApproveAction = async () => {
    setLoading(true);
    try {
      const actionHandler = getActionHandler(module);
      const { status, message } = await actionHandler({ pk });

      if (status === "success") {
        return toast({
          title: `Success ${title}`,
          description: message,
          status: "success",
        });
      }
      throw new Error(message);
    } catch (error) {
      const message = error instanceof Error ? error.message : "An error occurred";

      return toast({
        title: `Failed ${title}`,
        description: message,
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size="sm"
      fontSize="xs"
      colorScheme="blue"
      variant="outline"
      leftIcon={
        <Icon as={FaCheck} />
      }
      loadingText="Approving..."
      isLoading={loading}
      onClick={onApproveAction}
      {...props}
    >
      {title}
    </Button>
  );
}

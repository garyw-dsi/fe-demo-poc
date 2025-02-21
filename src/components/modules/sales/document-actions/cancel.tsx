"use client"

import { salesInvoiceCancel } from "@/app/actions/modules/sales/invoices";
import { salesOrderCancel } from "@/app/actions/modules/sales/orders";
import { salesQuotationCancel } from "@/app/actions/modules/sales/quotations";
import { Button, ButtonProps, Icon, useToast } from "@chakra-ui/react"
import { useParams } from "next/navigation";
import { useState } from "react";
import { FaX } from "react-icons/fa6";

type Modules = "quotation" | "invoice" | "order";

interface Props extends ButtonProps {
  module: Modules;
}

const getActionHandler = (module: Modules) => {
  switch (module) {
    case "quotation":
      return salesQuotationCancel;
    case "invoice":
      return salesInvoiceCancel;
    case "order":
      return salesOrderCancel;
    default:
      throw new Error("Invalid module type");
  }
};

export default function ModuleSalesCancelAction({
  module, ...props
}: Props) {
  const params = useParams();
  const toast = useToast();

  const pk = Number(params.pk);

  const [loading, setLoading] = useState<boolean>(false);

  const title = {
    quotation: "Cancel Quotation",
    invoice: "Cancel Invoice",
    order: "Cancel Order",
  }[module];

  const onCancelAction = async () => {
    setLoading(true);
    try {
      const actionHandler = getActionHandler(module);
      const { status, message } = await actionHandler({ pk });

      if (status === "success") {
        return toast({
          title: status === "success" ? `Success ${title}` : `Failed ${title}`,
          description: message,
          status: status === "success" ? "success" : "error",
        });
      }
      throw new Error(message);
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : "An error occurred";

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
      colorScheme="red"
      variant="outline"
      leftIcon={
        <Icon as={FaX} />
      }
      loadingText="Canceling..."
      isLoading={loading}
      onClick={onCancelAction}
      {...props}
    >
      {title}
    </Button>
  );
}

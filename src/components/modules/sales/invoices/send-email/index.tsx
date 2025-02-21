import { checkUserAction } from "@/app/actions/modules";
import ModuleSalesInvoiceSendEmailForm from "./form";

export default async function ModuleSalesInvoiceSendEmail() {
  const actionSendEmail = await checkUserAction({ action: "send_invoice_email" });

  if (!actionSendEmail) {
    return null
  }

  return <ModuleSalesInvoiceSendEmailForm />
}
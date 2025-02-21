import { checkUserAction } from "@/app/actions/modules";
import ModuleSalesQuotationSendEmailForm from "./form";

export default async function ModuleSalesQuotationSendEmail() {
  const actionSendEmail = await checkUserAction({ action: "send_quotation_email" });

  if (!actionSendEmail) {
    return null
  }

  return <ModuleSalesQuotationSendEmailForm />
}
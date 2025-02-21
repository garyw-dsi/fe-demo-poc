import { checkUserAction } from "@/app/actions/modules";
import ModuleSalesOrderSendEmailForm from "./form";

export default async function ModuleSalesOrderSendEmail() {
  const actionSendEmail = await checkUserAction({ action: "send_order_email" });

  if (!actionSendEmail) {
    return null
  }

  return <ModuleSalesOrderSendEmailForm />
}
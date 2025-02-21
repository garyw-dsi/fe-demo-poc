import createClient from "openapi-fetch";

import { accountingServices } from "@/libs/api/constants";
import { paths as accounting_schema } from "@/libs/api/schema/accounting";
import { authMiddleware } from "@/libs/api/services/middleware";

export const accountingClient = createClient<accounting_schema>({
  baseUrl: accountingServices,
})

accountingClient.use(authMiddleware);

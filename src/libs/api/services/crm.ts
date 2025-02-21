import createClient from "openapi-fetch";

import { crmServices } from "@/libs/api/constants";
import { paths as crm_schema } from "@/libs/api/schema/crm";
import { authMiddleware } from "@/libs/api/services/middleware";

export const crmClient = createClient<crm_schema>({
  baseUrl: crmServices,
})

crmClient.use(authMiddleware);

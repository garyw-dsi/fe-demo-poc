import createClient from "openapi-fetch";

import { salesServices } from "@/libs/api/constants";
import { paths as sales_schema } from "@/libs/api/schema/sales";
import { authMiddleware } from "@/libs/api/services/middleware";

export const salesClient = createClient<sales_schema>({
  baseUrl: salesServices,
})

salesClient.use(authMiddleware);

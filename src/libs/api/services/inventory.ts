import createClient from "openapi-fetch";

import { inventoryServices } from "@/libs/api/constants";
import { paths as inventory_schema } from "@/libs/api/schema/inventory";
import { authMiddleware } from "@/libs/api/services/middleware";

export const inventoryClient = createClient<inventory_schema>({
  baseUrl: inventoryServices
})

inventoryClient.use(authMiddleware);

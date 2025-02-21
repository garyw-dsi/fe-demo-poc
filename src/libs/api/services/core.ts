import createClient from "openapi-fetch";

import { coreServices } from "@/libs/api/constants";
import { paths as core_schema } from "@/libs/api/schema/core-services";
import { authMiddleware } from "@/libs/api/services/middleware";

export const coreClient = createClient<core_schema>({
  baseUrl: coreServices
})

coreClient.use(authMiddleware);

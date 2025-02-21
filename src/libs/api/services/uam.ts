import createClient from "openapi-fetch";

import { uamServices } from "@/libs/api/constants";
import { paths as uam_schema } from "@/libs/api/schema/uam";
import { authMiddleware } from "@/libs/api/services/middleware";

export const uamClient = createClient<uam_schema>({
  baseUrl: uamServices
})

uamClient.use(authMiddleware);

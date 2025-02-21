import createClient, { type Middleware } from "openapi-fetch";

import { uamServices } from "@/libs/api/constants";
import { paths as uam_schema } from "@/libs/api/schema/uam";
import logger from "@/libs/logger";

export const authClient = createClient<uam_schema>({
  baseUrl: uamServices,
})

const middleware: Middleware = {
  async onRequest({ request }) {
    logger.info("API REQUEST", {
      url: request.url,
      method: request.method,
    });

		return request;
  },
  
  async onResponse({ response, request }) {
    logger.info("API RESPONSE", {
      url: request.url,
      method: request.method,
      status: response.status,
      statusText: response.statusText,
    });

		return response;
	},
}

authClient.use(middleware)
import logger from "@/libs/logger";
import { authOptions } from "@/libs/next-auth";
import { getServerSession } from "next-auth";
import { type Middleware } from "openapi-fetch";

export const authMiddleware: Middleware = {
  async onRequest({ request }) {
    const session = await getServerSession(authOptions);
    
		if (!session) {
			return request;
    }

    const { user } = session;
    const token = user.access_token;
    
    request.headers.set("Authorization", `Bearer ${token}`);
    
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

    if (
      response.status === 401 ||
      response.status === 403
    ) {
      return;
		}
		return response;
	},
};
import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import { CONFIG } from "@/shared/model/config";
import type { ApiPaths } from "./schema";

export const fetchClient = createFetchClient<ApiPaths>({
  baseUrl: CONFIG.API_BASE_URL,

  fetch: async (request: Request): Promise<Response> => {
    const res = await fetch(request);
    if (!res.ok) {
      const errorBody = await res.clone().json().catch(() => ({}));
      const err = new Error(`HTTP error ${res.status}`) as any;
      err.status = res.status;
      err.body = errorBody;
      throw err;
    }
    return res;
  }
});

export const rqClient = createClient(fetchClient);

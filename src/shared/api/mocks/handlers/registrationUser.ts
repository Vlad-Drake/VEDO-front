import { HttpResponse, delay } from "msw";
import { http } from "../http";
import type { ApiSchemas } from "../../schema";

const registation: ApiSchemas["RegistrationResponse"] = {
  code: '200',
  message: 'ok'
};

export const registrationUserHandlers = [

  http.post("/registration", async (_) => {
    
    await delay(2000);
    return HttpResponse.json(registation);
    /*return HttpResponse.json(
      {
        message: "Resource not found",
        code: "NotFound"
      },
      {
        status: 404,
        statusText: "Not Found",
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );*/
  }),
];

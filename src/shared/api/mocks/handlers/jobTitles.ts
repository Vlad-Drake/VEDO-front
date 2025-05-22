import { HttpResponse, delay } from "msw";
import { http } from "../http";
import type { ApiSchemas } from "../../schema";
import { http as rawHttp } from "msw"; // <--- это обычный http из msw

const jobTitles: ApiSchemas["JobTitlesResponse"] = {
  data: [
    "*Заместитель директора магазина",
    "Администратор баз данных",
    "Администратор столовой",
  ],
};

export const jobTitlesHandlers = [
  /*http.get("/boards", async (ctx) => {
    await verifyTokenOrThrow(ctx.request);
    return HttpResponse.json(boards);
  }),*/
  /*rawHttp.all('*', ({ request }) => {
    console.warn('Unhandled request to:', request.url);
    return HttpResponse.text('No matching route', { status: 404 });
  }),*/
  http.post("/jobTitle", async (ctx) => {
    console.log("[MSW] /jobTitles called");
    await delay(2000);
    //await verifyTokenOrThrow(ctx.request);
    //const data = await ctx.request.json();
    //return HttpResponse.json(jobTitles);
    const body = await HttpResponse.json(); // если нужно, можешь логировать body
    /*return HttpResponse.json({
      data: [
        "*Заместитель директора магазина",
        "Администратор баз данных",
        "Администратор столовой",
      ],
    });*/
    return HttpResponse.json(
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
    );
  }),
];

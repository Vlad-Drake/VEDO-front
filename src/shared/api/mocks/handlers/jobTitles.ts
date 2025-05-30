import { HttpResponse, delay } from "msw";
import { http } from "../http";
import type { ApiSchemas } from "../../schema";

const jobTitles: ApiSchemas["JobTitlesResponse"] = {
  list: [
    {id: 1, jobTitle: '*Заместитель директора магазина'},
    {id: 2, jobTitle: 'Администратор баз данных'},
    {id: 3, jobTitle: 'Администратор столовой'},
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
  http.get("/jobTitle", async (_) => {
    
    await delay(2000);
    //await verifyTokenOrThrow(ctx.request);
    //const data = await ctx.request.json();
    //return HttpResponse.json(jobTitles);
    //const body = await HttpResponse.json(); // если нужно, можешь логировать body
    return HttpResponse.json(jobTitles);
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

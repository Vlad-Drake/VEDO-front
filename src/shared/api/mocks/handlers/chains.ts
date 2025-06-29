import { HttpResponse, delay } from "msw";
import { http } from "../http";
import type { ApiSchemas } from "../../schema";

const chains: ApiSchemas["ChainsResponse"] = {
  list: [
    {
      docType: 'doc 1',
      docSource: '1C',
      approvers: [
        { queueId: 1, jobTitleId: 1, email: 'test1@slata.com' },
        { queueId: 1, jobTitleId: 1, email: 'test2@slata.com' },
        { queueId: 2, jobTitleId: 2, email: 'test3@slata.com' },
      ],
    },
    {
      docType: 'doc 2',
      docSource: '1C',
      approvers: [
        { queueId: 1, jobTitleId: 1, email: 'test1@slata.com' },
        { queueId: 1, jobTitleId: 1, email: 'test2@slata.com' },
        { queueId: 2, jobTitleId: 2, email: 'test3@slata.com' },
      ],
    },
    {
      docType: 'doc 3',
      docSource: 'DAX',
      approvers: [
        { queueId: 1, jobTitleId: 1, email: 'test2@slata.com' },
        { queueId: 2, jobTitleId: 1, email: 'test1@slata.com' },
      ],
    },
    {
      docType: 'doc 4',
      docSource: 'Symphony',
      approvers: [
        { queueId: 1, jobTitleId: 1, email: 'test3@slata.com' },
        { queueId: 2, jobTitleId: 1, email: 'test2@slata.com' },
        { queueId: 2, jobTitleId: 2, email: 'test1@slata.com' },
      ],
    },


  ],
};

export const chainsHandlers = [
  /*http.get("/boards", async (ctx) => {
    await verifyTokenOrThrow(ctx.request);
    return HttpResponse.json(boards);
  }),*/
  /*rawHttp.all('*', ({ request }) => {
    console.warn('Unhandled request to:', request.url);
    return HttpResponse.text('No matching route', { status: 404 });
  }),*/
  http.get("/chains", async (_) => {

    await delay(1000);
    //await verifyTokenOrThrow(ctx.request);
    //const data = await ctx.request.json();
    //return HttpResponse.json(jobTitles);
    //const body = await HttpResponse.json(); // если нужно, можешь логировать body
    return HttpResponse.json(chains);
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

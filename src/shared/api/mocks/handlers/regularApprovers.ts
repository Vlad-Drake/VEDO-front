import { HttpResponse, delay } from "msw";
import { http } from "../http";
import type { ApiSchemas } from "../../schema";

const regularApprovers: ApiSchemas['RegularApproversResponse'] = {
    list: [
        {
            pref: 'pref1',
            docId: 1,
            email: 'test1@slata.com'
        },
        {
            pref: 'pref2',
            docId: 3,
            email: 'test2@slata.com'
        },
        {
            pref: 'pref3',
            docId: 2,
            email: 'test3@slata.com'
        },
    ]
};

export const regularApproversHandlers = [
    http.get("/regular-approvers", async (_) => {
        await delay(1000);
        return HttpResponse.json(regularApprovers);
    }),
];
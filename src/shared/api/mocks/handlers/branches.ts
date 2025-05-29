import { http } from '../http';
import type { ApiSchemas } from '../../schema';
import { delay, HttpResponse } from 'msw';

const branches: ApiSchemas["BranchesListResponse"] = {
    list: [
        {id: 1, branch: 'TT 1'},
        {id: 2, branch: 'TT 2'},
        {id: 3, branch: 'TT 3'},
    ]
}

export const branchesHandler = [
    http.get('/branches', async (ctx) => {
        await delay(1500);
        return HttpResponse.json(branches);
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
    })
]
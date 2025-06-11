import { http } from '../http';
import type { ApiSchemas } from '../../schema';
import { delay, HttpResponse } from 'msw';

const branches: ApiSchemas["BranchesListResponse"] = {
    list: [
        { id: 1, branch: 'TT 1' },
        { id: 2, branch: 'TT 2' },
        { id: 3, branch: 'TT 3' },
        { id: 4, branch: 'TT 4' },
        { id: 5, branch: 'TT 5' },
        { id: 6, branch: 'TT 6' },
        { id: 7, branch: 'TT 7' },
    ]
}

export const branchesHandler = [
    http.get('/branches', async (_) => {
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
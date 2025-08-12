import { http } from '../http';
import type { ApiSchemas } from '../../schema';
import { delay, HttpResponse } from 'msw';

const branchCodes: ApiSchemas["BranchCodeListResponse"] = {
    list: [
        { id: 1, code: 'Код 1С' },
        { id: 2, code: 'Код SM' },
        { id: 3, code: 'Код общепита' },
    ]
}

export const branchCodesHandler = [
    http.get('/branch-codes', async (_) => {
        await delay(1500);
        return HttpResponse.json(branchCodes);
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
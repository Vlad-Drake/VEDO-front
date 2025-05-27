import { http } from '../http';
import type { ApiSchemas } from '../../schema';
import { delay, HttpResponse } from 'msw';

const branches: ApiSchemas["BranchesListResponse"] = {
    list: [
        'TT 1',
        'TT 2',
        'TT 3',
    ]
}

export const branchesHandler = [
    http.get('/branches', async (ctx) => {
        await delay(1500);
        return HttpResponse.json(branches);
    })
]
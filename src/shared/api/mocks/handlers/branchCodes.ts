import { http } from '../http';
import type { ApiSchemas } from '../../schema';
import { delay, HttpResponse } from 'msw';

const branchCodes: ApiSchemas["CodeListResponse"] = {
    list: [
        'Код 1С',
        'Код SM',
        'Код общепита',
    ]
}

export const branchCodesHandler = [
    http.get('/branch-codes', async (ctx) => {
        await delay(1500);
        return HttpResponse.json(branchCodes);
    })
]
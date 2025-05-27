import { http } from '../http';
import type { ApiSchemas } from '../../schema';
import { delay, HttpResponse } from 'msw';

const signers: ApiSchemas["SignersResponse"] = {
    list: [
        {
            row: 1,
            signer: "test s1",
            email: "test e1"
        },
        {
            row: 2,
            signer: "test s2",
            email: "test e2"
        },
        {
            row: 3,
            signer: "test s3",
            email: "test e3"
        }
    ]
}

export const signersHandler = [
    http.get('/signers', async (ctx) => {
        console.log('ctx', ctx);
        await delay(1500);
        return HttpResponse.json(signers);
    })
]
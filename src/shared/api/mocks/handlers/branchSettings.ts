import { http } from '../http';
import type { ApiSchemas } from '../../schema';
import { HttpResponse } from 'msw';

const branchSigners: ApiSchemas['BranchSignersResponse'] = {
    signers: [
        {
            row: 1,
            jobTitleId: 1,
            email: "test1@slata.com",
            docTypes: [
                { docId: 1, checked: false },
                { docId: 2, checked: true },
                { docId: 3, checked: true },
            ]
        },
        {
            row: 2,
            jobTitleId: 2,
            email: "test e2",
            docTypes: [
                { docId: 1, checked: false },
                { docId: 2, checked: true },
                { docId: 3, checked: false },
            ]
        },
        {
            row: 3,
            jobTitleId: 1,
            email: "test e3",
            docTypes: [
                { docId: 1, checked: true },
                { docId: 2, checked: false },
                { docId: 3, checked: false },
            ]
        }
    ],
}
const branchSettings: ApiSchemas['BranchSettingsResponse'] = {
    settings: [
        {
            row: 1,
            typeId: 2,
            code: '84',
        }
    ]
}
export const branchSignersHandler = [
    http.put('/update-branch-signers', async (_) => {
        //return HttpResponse.json({ code: '200', message: 'ok' });
        return HttpResponse.json(
            {
                message: "ok",
                code: "200"
            },
            {
                status: 200,
                statusText: "success",
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }),
    http.get('/branch-signers', async (_) => {
        //console.log('ctx', ctx);
        //await delay(1500);
        return HttpResponse.json(branchSigners);
    })
]
export const branchSettingsHandler = [
    http.put('/update-branch-settings', async (_) => {
        return HttpResponse.json(
            {
                message: "Can't do it",
                code: "NotFound"
            },
            {
                status: 500,
                statusText: "Can't do it",
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }),
    http.get('/branch-settings', async (_) => {
        //console.log('ctx', ctx);
        //await delay(1500);
        return HttpResponse.json(branchSettings);
    })
]
import { http } from '../http';
import type { ApiSchemas } from '../../schema';
import { delay, HttpResponse } from 'msw';

const branchSettings: ApiSchemas['BranchSettingsResponse'] = {
    signers: [
        {
            row: 1,
            jobTitleId: 1,
            email: "test1@slata.com",
            docTypes: [
                {docId: 1, checked: false},
                {docId: 2, checked: true},
                {docId: 3, checked: true},
            ]
        },
        {
            row: 2,
            jobTitleId: 2,
            email: "test e2",
            docTypes: [
                {docId: 1, checked: false},
                {docId: 2, checked: true},
                {docId: 3, checked: false},
            ]
        },
        {
            row: 3,
            jobTitleId: 1,
            email: "test e3",
            docTypes: [
                {docId: 1, checked: true},
                {docId: 2, checked: false},
                {docId: 3, checked: false},
            ]
        }
    ],
    settings: [
        {
            row: 1,
            typeId: 2,
            code: '84',
        }
    ]
}

export const branchSettingsHandler = [
    http.get('/branch-settings', async (_) => {
        //console.log('ctx', ctx);
        await delay(1500);
        return HttpResponse.json(branchSettings);
    })
]
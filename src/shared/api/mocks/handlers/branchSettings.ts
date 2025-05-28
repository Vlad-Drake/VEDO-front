import { http } from '../http';
import type { ApiSchemas } from '../../schema';
import { delay, HttpResponse } from 'msw';

const branchSettings: ApiSchemas['BranchSettingsResponse'] = {
    signers: [
        {
            row: 1,
            signer: "1", //Должен быть объект, если такой должности уже не будет?
            email: "test e1",
            docTypes: [
                {doc: "1", checked: false},
                {doc: "2", checked: true},
                {doc: "3", checked: true},
            ]
        },
        {
            row: 2,
            signer: "2",
            email: "test e2",
            docTypes: [
                {doc: "1", checked: false},
                {doc: "2", checked: true},
                {doc: "3", checked: false},
            ]
        },
        {
            row: 3,
            signer: "1",
            email: "test e3",
            docTypes: [
                {doc: "1", checked: true},
                {doc: "2", checked: false},
                {doc: "3", checked: false},
            ]
        }
    ],
    settings: [
        {
            row: 1,
            type: '2',
            code: '84',
        }
    ]
}

export const branchSettingsHandler = [
    http.get('/branch-settings', async (ctx) => {
        //console.log('ctx', ctx);
        await delay(1500);
        return HttpResponse.json(branchSettings);
    })
]
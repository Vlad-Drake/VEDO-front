import { http } from '../http';
import type { ApiSchemas } from '../../schema';
import { delay, HttpResponse } from 'msw';

const docInfo: ApiSchemas["DocInfoResponse"] = {
    list: [
        {
            question: 'Актуальность документа',
            answer: 'Актуально',
        },
        {
            question: 'Использование внутри компании',
            answer: 'Да',
        },

        {
            question: 'Роспотребнадзор может запросить данный тип документа',
            answer: 'Да',
        },
        {
            question: 'Место создания документа',
            answer: '1С',
        },
        {
            question: 'Источник документа',
            answer: 'Цеха, ППЦ, магазины',
        },
    ]
}

export const docInfoHandler = [
    http.get('/doc-info', async (_) => {
        //console.log('ctx', ctx);
        await delay(1500);
        return HttpResponse.json(docInfo);
    })
]

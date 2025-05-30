import { http } from '../http';
import type { ApiSchemas } from '../../schema';
import { delay, HttpResponse } from 'msw';

const docs: ApiSchemas["DocsResponse"] = {
    list: [
        {
            docName: 'kd_173_29052025_143333',
            date: '30.05.2025',
            //branch: 'Хлеб-Соль Иркутск, Тельмана 38',
            approved: false,
        },
        {
            docName: 'kd_109_29052025_001641',
            date: '30.05.2025',
            //branch: 'Магазин ИВАИИ',
            approved: true,
        },
        {
            docName: 'kd_147_29052025_002003',
            date: '30.05.2025',
            //branch: 'Магазин Карла Либкнехта',
            approved: true,
        }
    ]
}

export const docsHandler = [
    http.get('/docs', async (_) => {
        //console.log('ctx', ctx);
        await delay(1500);
        return HttpResponse.json(docs);
    })
]

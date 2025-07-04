import { http } from '../http';
import type { ApiSchemas } from '../../schema';
import { delay, HttpResponse } from 'msw';

const docTypes: ApiSchemas["DocTypeListResponse"] = {
  list: [
    { id: 1, docType: 'ОП 4 - Производство', pref: 'd1' },
    { id: 2, docType: 'Списание (AX)', pref: 'd2' },
    { id: 3, docType: 'Остатки на начало дня', pref: 'd3' },
    /*{id: 4, docType: 'Результат ревизии'},
    {id: 5, docType: 'Расход продуктов Производство'},
    {id: 6, docType: 'Торг-13 Производство'},
    {id: 7, docType: 'Сейф'},
    {id: 8, docType: 'Приказ на ревизию касс'},
    {id: 9, docType: 'Перемещение между складами и цехами'},
    {id: 10, docType: 'Кассы'},
    {id: 11, docType: 'ИНВ-15'},
    {id: 12, docType: 'План меню ОП2 - Производство'},
    {id: 13, docType: 'Маркировочный лист'},
    {id: 14, docType: 'Остатки на конец дня'},
    {id: 15, docType: 'Остальные документы'},
    {id: 16, docType: 'Бухгалтерская справка'},
    {id: 17, docType: 'Оп23 Производство'},
    {id: 18, docType: 'Кассовая дисциплина'},
    {id: 19, docType: 'Перемещение товара с 1С'},
    {id: 20, docType: 'Приказ об установлении лимита остатка кассы'},
    {id: 21, docType: 'ОП 14 Производство'},
    {id: 22, docType: 'Приказ на ревизию'},
    {id: 23, docType: 'ИНВ-3'},
    {id: 24, docType: 'ИНВ-19'},
    {id: 25, docType: 'Перемещение товара (АХ)'},
    {id: 26, docType: 'Сводный отчет по производству'},
    {id: 27, docType: 'Материальные отчёты'},
    {id: 28, docType: 'ИНВ-26'},
    {id: 29, docType: 'ОП4'},
    {id: 30, docType: 'Акт списания (ТОРГ-16)'},
    {id: 31, docType: 'Сводная ведомость денежной наличности в магазине'},*/
  ]
}

export const docTypesHandler = [
  http.get('/doc-types', async (_) => {
    await delay(1500);
    return HttpResponse.json(docTypes);
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
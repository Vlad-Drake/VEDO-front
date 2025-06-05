import { useLoadingPage } from "@/shared/model/loadingPage";
import { SelectRadioKit } from "@/shared/ui/selectRadioKit/selectRadioKit";
import { useEffect, useRef, useState } from "react";
import { useDocTypes } from "@/shared/model/use-doc-types";
import { href, useNavigate, useParams } from "react-router-dom";
import { CalendarKit } from "@/shared/ui/calendarKit/calendarKit";
import { ButtonKit } from "@/shared/ui/buttonKit/buttonKit";
import { useDocs } from "./use-docs";
import { useDocTypesWithState } from "./use-doc-types";
import { useBranches } from "@/shared/model/use-branches";

interface DocsModel {
    docName: string,
    date: string
    approved: boolean,
}

function Docs() {
    const navigate = useNavigate();
    const { docstype: docTypeParam } = useParams<"docstype">();

    //const loadingPage = useLoadingPage();
    const docTypes = useDocTypesWithState(docTypeParam);
    const branches = useBranches();

    const [selectedBranchId, setSelectedBranchId] = useState<number | null>(null);
    const [dateStart, setDateStart] = useState<Date | null>(new Date());
    const [dateEnd, setDateEnd] = useState<Date | null>(new Date());

    const docsRequest = useDocs();


    //const [docs, setDocs] = useState<DocsModel[]>([]);

    /*useEffect(() => {
        loadingPage.loading();
        if(!(branches.branches.isPending || docTypes.docTypes.isPending)) {
            if(branches.branches.isError || docTypes.docTypes.isError) {
                loadingPage.error(
                    [branches.branches.error ? `Ошибка получения филиалов: ${branches.branches.error.message}` : '',
                    docTypes.docTypes.error ? `Ошибка получения кодов документов: ${docTypes.docTypes.error.message}` : ''].join(' ')
                );
            } else {
                !loadingPage.loadingPage.errorMessage && loadingPage.done();
            }
        }
        loadingPage.done()
    }, [
        branches.branches.isPending,
        docTypes.docTypes.isPending,
    ]);*/



    const setURL = (value: string) => {
        navigate(href("/docs/:docstype", { docstype: value }));
    }

    const getDocs = () => {
        if (!(docTypes.selectedDocId && selectedBranchId && dateStart && dateEnd)) return;
        docsRequest.getDocs(docTypes.selectedDocId, selectedBranchId, String(dateStart), String(dateEnd));
    }

    const changeDoc = (event: string | number) => {
        const newId = Number(event);
        docTypes.setSelectedDocId(newId);
        setSelectedBranchId(null);
    }

    return (
        <div className="gap-[35px] content">
            <h1 className="text-center">Документы</h1>
            <div className="flex flex-row gap-10 justify-start">
                <p
                    className={`w-[200px] content-center text-left`}
                >
                    Выберите тип документа:
                </p>
                {docTypes.data &&
                    <SelectRadioKit
                        placeholder='Выберите тип документа'
                        width="500px"
                        selectedId={docTypes.selectedDocId}
                        updateId={(event) => changeDoc(event)}
                        updateName={(event) => {
                            setURL(event);
                            docTypes.docName.current = event;
                        }}
                        options={(docTypes.data?.list ?? []).map(item => ({
                            id: item.id,
                            name: item.docType
                        }))}
                    />
                }
            </div>
            <div className='border-t-2 border-dashed'></div>
            {docTypes.selectedDocId &&
                <>
                    <div className='flex flex-col gap-[10px]'>
                        <h2 className="text-left">{docTypes.docName.current}</h2>

                        <div className="flex flex-row gap-10 justify-start">
                            <p
                                className={`w-[200px] content-center text-left`}
                            >
                                Выберите филиал:
                            </p>
                            <SelectRadioKit
                                placeholder='Выберите филиал'
                                width="500px"
                                selectedId={selectedBranchId}
                                updateId={(event) => {
                                    const newId = Number(event)
                                    setSelectedBranchId(newId);
                                }}
                                updateName={(event) => setURL(event)}
                                options={(branches.branches.data?.list ?? []).map(branch => ({
                                    id: branch.id,
                                    name: branch.branch
                                }))}
                            />
                        </div>

                        <div className="flex justify-between">
                            <div className="flex gap-10 justify-start">
                                <p
                                    className={`w-[200px] content-center text-left`}
                                >
                                    Укажите диапазон дат:
                                </p>
                                <CalendarKit
                                    value={dateStart}
                                    width='230px'
                                    updateValue={event => setDateStart(event)}
                                    placeholder='dd.mm.yyyy'
                                />
                                <CalendarKit
                                    value={dateEnd}
                                    width='230px'
                                    updateValue={event => setDateEnd(event)}
                                    placeholder='dd.mm.yyyy'
                                />
                                <ButtonKit
                                    btnContent={<p>Найти</p>}
                                    btnStatus='default'
                                    btnClick={getDocs}
                                    btnType='primary'
                                />
                            </div>
                        </div>

                    </div>
                    {selectedBranchId !== null && 
                        <div>
                            <div>Кнопки</div>
                            <table className="min-w-full border border-[var(--color-gray)] divide-y divide-[var(--color-gray)]">
                                <thead>
                                    <tr className="bg-[var(--color-gray-light)] divide-x divide-[var(--color-gray)]">
                                        <th className="px-4 py-2 text-left">Имя документа</th>
                                        <th className="px-4 py-2 text-left">Дата прихода</th>
                                        <th className="px-4 py-2 text-left">Статус</th>
                                    </tr>
                                </thead>
                                {docsRequest.docsMutation.data && docsRequest.docsMutation.data.list.length > 0 &&
                                    <tbody className="divide-y divide-[var(--color-gray)]">
                                        {docsRequest.docsMutation.data.list.map((item, index) => (
                                            <tr key={`${index}_docRow`} className="odd:bg-[var(--color-gray-light)] divide-x divide-[var(--color-gray)]">
                                                <td className="px-4 py-2 text-left">{item.docName}</td>
                                                <td className="px-4 py-2 text-left">{item.date}</td>
                                                <td className="px-4 py-2 text-left">{item.approved ? '+' : '-'}</td>
                                            </tr>
                                        ))}

                                    </tbody>
                                }
                            </table>
                        </div>
                    }
                    
                </>
            }
        </div>
    );
}
export const Component = Docs;
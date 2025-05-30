import { useLoadingPage } from "@/shared/model/loadingPage";
import { SelectRadioKit } from "@/shared/ui/selectRadioKit/selectRadioKit";
import { useEffect, useRef, useState } from "react";
import { useDocTypes } from "../branch/model/use-doc-types";
import { href, useNavigate, useParams } from "react-router-dom";
import { useBranches } from "../branch/model/use-branches";
import { CalendarKit } from "@/shared/ui/calendarKit/calendarKit";
import { ButtonKit } from "@/shared/ui/buttonKit/buttonKit";
import { useDocs } from "./use-docs";

interface DocsModel {
    docName: string,
    date: string    
    approved: boolean,
}

function Docs() {
    const navigate = useNavigate();
	const { doctype: docTypeParam } = useParams<"doctype">();

    const loadingPage = useLoadingPage();
    const docTypes = useDocTypes();
    const branches = useBranches();
    const [selectedDocId, setSelectedDocId] = useState<number | null>(null);
    const [selectedBranchId, setSelectedBranchId] = useState<number | null>(null);
    const [dateStart, setDateStart] = useState<Date | null>(new Date());
    const [dateEnd, setDateEnd] = useState<Date | null>(new Date());
    const docName = useRef<string>('');
    const docsRequest = useDocs();
    const [docs, setDocs] = useState<DocsModel[]>([]);
    
    useEffect(() => {
        loadingPage.reset();
    }, []);
    useEffect(() => {
		loadingPage.loading();
		if(!(branches.branches.isPending || docTypes.docTypes.isPending)) {
			if(branches.branches.isError || docTypes.docTypes.isError) {
				loadingPage.error(
                    [branches.branches.error ? `Ошибка получения филиалов: ${branches.branches.error.message}` : '',
                    docTypes.docTypes.error ? `Ошибка получения кодов документов: ${docTypes.docTypes.error.message}` : ''].join(' ')
                );
			} else {
                branches.setBranchesState(branches.branches.data?.list ?? []);
				docTypes.setDocTypesState(docTypes.docTypes.data?.list ?? []);
				if(docTypeParam && docTypeParam !== 'all' && selectedDocId === null) {
					const item = docTypes.docTypes.data?.list.find(item => item.docType === docTypeParam)
					docName.current = item?.docType ?? '';
					setSelectedDocId(item?.id ?? null);
				}
				!loadingPage.loadingPage.errorMessage && loadingPage.done();
			}
		}
	}, [
        branches.branches.isPending,
		docTypes.docTypes.isPending,
		selectedDocId
	]);

    const setURL = (value: string) => {
		navigate(href("/docs/:docstype", { docstype: value }));
	}
    
    const getDocs = () => {
        if(!(selectedDocId && selectedBranchId && dateStart && dateEnd)) return;
        docsRequest.getDocs(selectedDocId, selectedBranchId, String(dateStart), String(dateEnd));
        
    }

    useEffect(() => {
        if(!docsRequest.docsMutation.isPending) {
            if(docsRequest.docsMutation.data?.list) {
                setDocs(docsRequest.docsMutation.data.list);
            } else {
                setDocs([]);
            }
        }
    }, [docsRequest.docsMutation.isPending])

    return (
        <div className="gap-[35px] content">
            <h1 className="text-center">Документы</h1>
            <div className="flex flex-row gap-10 justify-start">
                <p
                    className={`w-[200px] content-center text-left`}
                >
                    Выберите тип документа:
                </p>
                <SelectRadioKit
					placeholder='Выберите тип документа'
					width="500px"
					selectedId={selectedDocId}
					updateId={(event) => {
						const newId = Number(event)
						setSelectedDocId(newId);
					}}
					updateName={(event) => {
						setURL(event);
						docName.current = event;
					}}
					options={(docTypes.docTypesState ?? []).map(item => ({
						id: item.id,
						name: item.docType
					}))}
				/>
            </div>
            <div className='border-t-2 border-dashed'></div>
			{selectedDocId && 
				<>
                    <div className='flex flex-col gap-[10px]'>
                        <h2 className="text-left">{docName.current}</h2>

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
                                options={(branches.branchesState ?? []).map(branch => ({
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
                    <div className='border-t-2 border-dashed'></div>
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
                            {docs.length > 0 && 
                                <tbody className="divide-y divide-[var(--color-gray)]">
                                    {docs.map((item, index) => (
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
                </>
			}
        </div>
    );
}
export const Component = Docs;
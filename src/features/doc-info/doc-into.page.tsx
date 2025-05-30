import { useLoadingPage } from "@/shared/model/loadingPage";
import { useEffect, useRef, useState } from "react";
import { useDocTypes } from "../branch/model/use-doc-types";
import { SelectRadioKit } from "@/shared/ui/selectRadioKit/selectRadioKit";
import { href, useNavigate, useParams } from "react-router-dom";
import classes from './doc-info.module.scss';
import { useDocInfo } from "./use-doc-info";

function DocInfo() {
	const navigate = useNavigate();
	const { doctype: docTypeParam } = useParams<"doctype">();

	const loadingPage = useLoadingPage();
	const docTypes = useDocTypes();
	const [selectedDocId, setSelectedDocId] = useState<number | null>(null);
	const docName = useRef<string>('');
	const docInfo = useDocInfo(selectedDocId ?? -1);

	useEffect(() => {loadingPage.reset();}, [])
	useEffect(() => {
		loadingPage.loading();
		if(!(docTypes.docTypes.isPending)) {
			if(docTypes.docTypes.isError) {
				loadingPage.error(docTypes.docTypes.error ? `Ошибка получения кодов документов: ${docTypes.docTypes.error.message}` : '');
			} else {
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
		docTypes.docTypes.isPending,
		selectedDocId
	]);

	const setURL = (value: string) => {
		navigate(href("/doc-info/:doctype", { doctype: value }));
	}

	return (
		<div className="gap-[35px] content">
			<h1 className="text-center">Информация о документах</h1>
			{/* Если информация изменилась, можете её изменить. Редактирование включается двойным щелчком по тексту.*/}
			<p>Здесь вы можете получить акутальную информацию о документах. Время хранения документов в ИС - 5 лет</p>

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
				<div className='flex flex-col gap-[10px]'>
					<h2 className="text-left">{docName.current}</h2>

					<div>
						{docInfo.data?.list.map((item, index) => (
							<div className={classes["content-row"]} key={index}>
								<div className={classes["question"]}>
									<p>{item.question}</p>
								</div>

								<div className={classes["answer"]}>
									<p>{item.answer}</p>
								</div>
							</div>
						))}
						
					</div>
					
				</div>
			}
		</div>
	);
}

export const Component = DocInfo;
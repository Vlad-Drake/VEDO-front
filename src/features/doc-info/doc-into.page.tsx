import { useDocTypesWithState } from "./use-doc-types";
import { SelectRadioKit } from "@/shared/ui/selectRadioKit/selectRadioKit";
import { href, useNavigate, useParams } from "react-router-dom";
import classes from './doc-info.module.scss';
import { useDocInfo } from "./use-doc-info";
import { LoaderKit } from "@/shared/ui/loaderKit/loaderKit";

function DocInfo() {
	const navigate = useNavigate();
	const { doctype: docTypeParam } = useParams<"doctype">();

	//const loadingPage = useLoadingPage();
	const docTypes = useDocTypesWithState(docTypeParam);
	const docInfo = useDocInfo(docTypes.selectedDocId);

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
					selectedId={docTypes.selectedDocId}
					updateId={(event) => {
						const newId = Number(event)
						docTypes.setSelectedDocId(newId);
					}}
					updateName={(event) => {
						setURL(event);
						docTypes.docName.current = event;
					}}
					options={(docTypes.data?.list ?? []).map(item => ({
						id: item.id,
						name: item.docType
					}))}
				/>
			</div>
			<div className='border-t-2 border-dashed'></div>
			{docTypes.selectedDocId &&
				<div className='flex flex-col gap-[10px]'>
					<h2 className="text-left">{docTypes.docName.current}</h2>

					<div>
						{!docInfo.isPending ? docInfo.data?.list.map((item, index) => (
							<div className={classes["content-row"]} key={index}>
								<div className={classes["question"]}>
									<p>{item.question}</p>
								</div>

								<div className={classes["answer"]}>
									<p>{item.answer}</p>
								</div>
							</div>
						))
							: (
								<LoaderKit />
							)
						}

					</div>

				</div>
			}
		</div>
	);
}

export const Component = DocInfo;
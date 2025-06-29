import { useDocTypesWithState } from "./use-doc-types";
import { useDocInfo } from "./use-doc-info";
import { SelectDocType } from "./select-doc-type";
import { Page } from "./doc-info-page";
import { DocInfoTable } from "./doc-info-table";

function DocInfo() {
	const docTypes = useDocTypesWithState();
	const docInfo = useDocInfo(docTypes.selectedDocId);

	return (
		<Page>
			<SelectDocType
				docTypes={docTypes.data?.list}
				selectedDocId={docTypes.selectedDocId}
				docName={docTypes.docName}
				setSelectedDocId={docTypes.setSelectedDocId}
				isPending={docTypes.isPending}
			/>
			<div className='border-t-2 border-dashed'></div>
			<DocInfoTable
				selectedDocId={docTypes.selectedDocId}
				docName={docTypes.docName.current}
				isPending={docInfo.isPending}
				docInfo={docInfo.data?.list}
			/>
		</Page >
	);
}

export const Component = DocInfo;
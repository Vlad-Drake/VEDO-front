import { useDocs } from "./model/use-docs";
import { useDocTypesWithState } from "./model/use-doc-types";
import { useBranches } from "@/shared/model/use-branches";
import { DocsTable } from "./ui/docs-table";
import { FormBranchNDates } from "./ui/form-branch-n-dates";
import { FormDocType } from "./ui/form-doc-type";
import { Page } from "./ui/docs-page";
import { FormBranchNDatesProvider } from "./ui/form-branch-n-dates-context";

function Docs() {
    const docTypes = useDocTypesWithState();

    const branches = useBranches();

    const docsRequest = useDocs(docTypes.selectedDocId);

    return (
        <Page>
            <FormDocType
                docTypes={docTypes.data?.list}
                isPending={docTypes.isPending}
                selectedDocId={docTypes.selectedDocId}
                docName={docTypes.docName}
                changeDoc={docTypes.changeDocType}
            />
            {branches.branches.error?.code}
            {branches.branches.error?.message}
            <div className='border-t-2 border-dashed'></div>
            {docTypes.selectedDocId &&
                <>
                    {docsRequest.docsMutation.error?.message}
                    <FormBranchNDates
                        docName={docTypes.docName.current}
                        branches={branches.branches.data?.list}
                        isPending={docsRequest.docsMutation.isPending}
                        getDocs={docsRequest.getDocs}
                    >
                        <DocsTable
                            docsList={docsRequest.docsMutation.data?.list}
                            isPending={docsRequest.docsMutation.isPending}
                            management={
                                <>
                                    <div>Кнопки</div>
                                </>
                            }
                        />
                    </FormBranchNDates>
                </>
            }
        </Page>
    );
}
export const Component = () => (
    <FormBranchNDatesProvider>
        <Docs />
    </FormBranchNDatesProvider>
);
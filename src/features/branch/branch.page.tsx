import { useJobTitles } from "@/shared/model/use-job-titles";
import { useBranchesWithState } from './model/use-branches';
import { useBranchCode } from '@/shared/model/use-branch-codes';
import { useBranchSettings } from './model/use-branch-settings';
import { ChainsApprove } from './ui/chains-approve';
import { Page } from './ui/branch-page';
import { SelectBranch } from './ui/select-branch';
import { SignersSettings } from './ui/signers-settings';
import { useDocTypesProcessed } from './model/use-doc-types';
import { BranchSettings } from "./ui/branch-settings";

function Branch() {
    const branches = useBranchesWithState();

    const jobTitles = useJobTitles();
    const branchCode = useBranchCode();
    const docTypes = useDocTypesProcessed();

    const branchSettings = useBranchSettings(docTypes.docTypesRecord, docTypes.docTypes, branches.selectedBranchId);

    return (
        <Page>
            <SelectBranch
                selectedBranchId={branches.selectedBranchId}
                setSelectedBranchId={branches.setSelectedBranchId}
                branches={branches.branches.data?.list}
                isPending={branches.isPendingBranch}
            />
            <div className='border-t-2 border-dashed'></div>
            <SignersSettings
                selectedBranchId={branches.selectedBranchId}
                isPending={branchSettings.isPending}
                jobTitles={jobTitles.jobTitles.data?.list}
                signers={branchSettings.signers}
                docsSigners={branchSettings.docsSigners}
                setDocsSigner={branchSettings.setDocsSigner}
                docTypes={docTypes.docTypes}
                docTypesRecord={docTypes.docTypesRecord}
                setSigners={branchSettings.setSigners}
                createRow={branchSettings.createSigner}
                deleteRow={branchSettings.deleteSigner}
            />
            <div className='border-t-2 border-dashed'></div>
            <BranchSettings
                settings={branchSettings.settings}
                selectedBranchId={branches.selectedBranchId}
                isPending={branchSettings.isPending}
                branchCodes={branchCode.branchCode.data?.list}
                deleteSetting={branchSettings.deleteSetting}
                setSettings={branchSettings.setSettings}
                createSetting={branchSettings.createSetting}
            />

            <div className='border-t-2 border-dashed'></div>
            <ChainsApprove
                branchId={branches.selectedBranchId}
            />

            <div className='border-t-2 border-dashed'></div>
            <div className='flex flex-col gap-[10px]'>
                <h3 className="text-left">История изменений</h3>
            </div>

        </Page>
    );
}

export const Component = Branch;

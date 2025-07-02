import { useJobTitles } from "@/shared/model/use-job-titles";
import { useBranchesWithState } from './model/use-branches';
import { useBranchCode } from '@/shared/model/use-branch-codes';
import { useBranchSettings } from './model/use-branch-settings';
import { ChainModalProvider, ChainsApprove } from './ui/chains-approve';
import { Page } from './ui/branch-page';
import { SelectBranch } from './ui/select-branch';
import { SignersSettings } from './ui/signers-settings';
import { useDocTypesProcessed } from './model/use-doc-types';
import { BranchSettings } from "./ui/branch-settings";
import { TableControlUI } from "./ui/table-control-ui";
import { SelectKit } from "@/shared/ui/selectKit";
import { TextInputKit } from "@/shared/ui/textInputKit/textInputKit";
import { ListCheckboxesKit } from "@/shared/ui/listCheckboxesKit";
import { BorderDashed } from "@/shared/ui/border-dashed";
import { ButtonKit } from "@/shared/ui/buttonKit/buttonKit";

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
            <BorderDashed />
            <SignersSettings
                selectedBranchId={branches.selectedBranchId}
            >
                <TableControlUI
                    rowsCache={branchSettings.rowSignersCache}
                    createObject={docTypes.docTypes ? branchSettings.createSigner : undefined}
                    isPending={branchSettings.isPending || jobTitles.jobTitles.isPending || docTypes.isPending}
                    addText="Добавить подписанта"
                    saveBtn={(changed) => (changed || branchSettings.signersChanged) &&
                        <ButtonKit
                            btnStatus='default'
                            btnClick={() => console.log()}
                            btnType='primary'
                            btnContent={
                                'Сохранить'
                            }
                        />
                    }
                >
                    {(id) => (
                        <>
                            <SelectKit
                                placeholder='Выберите должность'
                                width="340px"
                                selectedId={branchSettings.signers[id].jobTitleId}
                                updateId={(event) =>
                                    branchSettings.setSignersState(prev => ({
                                        ...prev,
                                        [branchSettings.signers[id].id]: { ...branchSettings.signers[id], jobTitleId: event as number }
                                    }))}
                                options={(jobTitles.jobTitles.data?.list ?? [])}
                                getValue={val => val.jobTitle}
                            />
                            <TextInputKit
                                name="email"
                                width='330px'
                                value={branchSettings.signers[id].email}
                                updateValue={(event) => branchSettings.setSignersState(prev => ({
                                    ...prev,
                                    [branchSettings.signers[id].id]: { ...branchSettings.signers[id], email: event }
                                }))}
                                placeholder="login@slata.com"
                            />
                            <ListCheckboxesKit
                                width='340px'
                                options={branchSettings.docsSigners?.[branchSettings.signers[id].id] ?? []}
                                update={(event) => branchSettings.setDocsSignersState(prev => ({
                                    ...prev,
                                    [branchSettings.signers[id].id]: event
                                }))
                                }
                                getValue={val => val.name}
                                getId={val => val.docId}
                                getCheck={val => val.checked}
                            />
                        </>
                    )}
                </TableControlUI>
            </SignersSettings>
            <BorderDashed />
            <BranchSettings
                selectedBranchId={branches.selectedBranchId}
            >
                <TableControlUI
                    rowsCache={branchSettings.rowSettingsCache}
                    createObject={docTypes.docTypes ? branchSettings.createSetting : undefined}
                    isPending={branchSettings.isPending || branchCode.branchCode.isPending}
                    addText="Добавить настройку"
                    saveBtn={(changed) => (changed || branchSettings.settingsChanged) &&
                        <ButtonKit
                            btnStatus='default'
                            btnClick={() => console.log()}
                            btnType='primary'
                            btnContent={
                                'Сохранить'
                            }
                        />
                    }
                >
                    {(id) => (
                        <>
                            <SelectKit
                                placeholder='Выберите настройку'
                                width="340px"
                                selectedId={branchSettings.settings[id].typeId}
                                updateId={(event) => branchSettings.setSettingsState(prev => ({
                                    ...prev,
                                    [branchSettings.settings[id].id]: { ...branchSettings.settings[id], typeId: event as number }
                                }))}
                                options={branchCode.branchCode.data?.list ?? []}
                                getValue={val => val.code}
                            />
                            <TextInputKit
                                width='330px'
                                value={branchSettings.settings[id].code}
                                updateValue={(event) => branchSettings.setSettingsState(prev => ({
                                    ...prev,
                                    [branchSettings.settings[id].id]: { ...branchSettings.settings[id], code: event }
                                }))}
                                placeholder="Введите значение"
                            />
                        </>
                    )}
                </TableControlUI>
            </BranchSettings>

            <BorderDashed />
            <ChainModalProvider>
                <ChainsApprove
                    branchId={branches.selectedBranchId}
                />
            </ChainModalProvider>


            <BorderDashed />
            <div className='flex flex-col gap-[10px]'>
                <h3 className="text-left">История изменений</h3>
            </div>

        </Page>
    );
}

export const Component = Branch;

import { SelectRadioKit } from '@/shared/ui/selectRadioKit/selectRadioKit';
import { useJobTitles } from "@/shared/model/use-job-titles";
import { TextInputKit } from '@/shared/ui/textInputKit/textInputKit';
import { useBranchesWithState } from './model/use-branches';
import { useBranchCode } from '@/shared/model/use-branch-codes';
import { useDocTypes } from '@/shared/model/use-doc-types';
import { useBranchSettings } from './model/use-branch-settings';
import { moveRowUp, moveRowDown, deleteRow, addRow } from './helper/sortingRow';
import { TablesButtons } from './ui/tables-btns';
import { ChainsApprove } from './ui/chains-approve';
import { Page } from './ui/branch-page';
import { SelectBranch } from './ui/select-branch';
import { SignersSettings } from './ui/signers-settings';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './branch.module.scss';
import { useDocTypesProcessed } from './model/use-doc-types';

function Branch() {
    const branches = useBranchesWithState();

    const jobTitles = useJobTitles();
    const branchCode = useBranchCode();
    const docTypes = useDocTypesProcessed();

    const branchSettings = useBranchSettings(docTypes.docTypesRecord, branches.selectedBranchId);

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
                docTypes={docTypes.docTypes}
                docTypesRecord={docTypes.docTypesRecord}
                setSigners={branchSettings.setSigners}
            />
            <div className='border-t-2 border-dashed'></div>
            <div className='flex flex-col gap-[10px]'>
                <h2 className="text-left">Настройки ТТ</h2>
                <div className='flex gap-[10px]'>
                    <h3 className='w-[340px]'>Тип кода</h3>
                    <h3 className='w-[330px]'>Код</h3>
                </div>
                {branches.selectedBranchId && <AnimatePresence>
                    {
                        branchSettings.settings.map((item, index) => {
                            return (
                                <motion.div
                                    key={item.row}
                                    layout
                                    initial={{ opacity: 0, x: 0 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    transition={{ duration: 0.3 }}
                                    className={styles["list"]}
                                >
                                    {/*<div className="list-item">{item.row}{item.signer}{item.email}</div>*/}
                                    <SelectRadioKit
                                        placeholder='Выберите настройку'
                                        width="340px"
                                        selectedId={item.typeId}
                                        updateId={(event) => {
                                            const newSettings = [...branchSettings.settings];
                                            newSettings[index] = {
                                                ...newSettings[index],
                                                typeId: event as typeof item.typeId
                                            };
                                            branchSettings.setSettings(newSettings)
                                        }}
                                        options={(branchCode.branchCode.data?.list ?? []).map(item => ({
                                            id: item.id,
                                            name: item.code,
                                        }))}
                                    />
                                    <TextInputKit
                                        width='330px'
                                        value={item.code}
                                        updateValue={(event) => {
                                            const newSettings = [...branchSettings.settings];
                                            newSettings[index] = {
                                                ...newSettings[index],
                                                code: event
                                            };
                                            branchSettings.setSettings(newSettings);
                                        }}
                                        placeholder="Введите значение"
                                    />
                                    <TablesButtons
                                        clickTop={() => branchSettings.setSettings(moveRowUp(item.row, branchSettings.settings))}
                                        clickDown={() => branchSettings.setSettings(moveRowDown(item.row, branchSettings.settings))}
                                        clickDelete={() => branchSettings.setSettings(deleteRow(item.row, branchSettings.settings))}
                                    />
                                    {item.row}
                                </motion.div>
                            )
                        })
                    }
                    <motion.div layout className={styles["list-content__add-row"]} key="plus">
                        <p>Добавить код</p>
                        <button onClick={() => branchSettings.setSettings(addRow(branchSettings.settings, { typeId: null, code: '' }))}>
                            ✚
                        </button>
                    </motion.div>
                </AnimatePresence>}

            </div>

            <div className='border-t-2 border-dashed'></div>
            <div className='flex flex-col gap-[10px]'>
                <h2 className="text-left">Цепочки согласований</h2>
                <ChainsApprove
                    branchId={branches.selectedBranchId}
                />
            </div>

            <div className='border-t-2 border-dashed'></div>
            <div className='flex flex-col gap-[10px]'>
                <h2 className="text-left">История изменений</h2>
            </div>

        </Page>
    );
}

export const Component = Branch;

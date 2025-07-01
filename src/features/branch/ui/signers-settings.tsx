import { SkeletonKit } from '@/shared/ui/skeleton-kit';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './signers-settings.module.scss';
import { SelectKit } from '@/shared/ui/selectKit';
import { TextInputKit } from '@/shared/ui/textInputKit/textInputKit';
import type { DocsSignerRecord, DocTypeModel, RowSignersRecord, SignerModel, SignersRecord } from '../model/use-branch-settings';
import { TablesButtons } from './tables-btns';
import React from 'react';
import type { DocTypesRecord } from '../model/use-doc-types';
import { ListCheckboxesKit } from '@/shared/ui/listCheckboxesKit';

export function SignersSettings({
    rowSigners,
    selectedBranchId,
    isPending,
    jobTitles,
    signers,
    docTypes,
    docTypesRecord,
    docsSigners,
    setSigners,
    setDocsSigner,
    createRow,
    deleteRow,
    moveRowUp,
    moveRowDown,
}: {
    rowSigners?: RowSignersRecord,
    selectedBranchId: number | null,
    isPending: boolean,
    jobTitles?: {
        id: number;
        jobTitle: string;
    }[],
    signers?: SignersRecord,
    docsSigners?: DocsSignerRecord,
    docTypes?: {
        id: number;
        docType: string;
    }[],
    docTypesRecord?: DocTypesRecord,
    setSigners: (signers?: SignersRecord) => void,
    setDocsSigner: (docsSigners: DocsSignerRecord) => void,
    createRow: () => void,
    deleteRow: (row: number) => void,
    moveRowUp: (row: number) => void,
    moveRowDown: (row: number) => void,
}) {
    return (
        <div className='flex flex-col gap-[10px]'>
            <h3 className="text-left">Подписанты</h3>
            <div className='flex gap-[10px]'>
                <h4 className='w-[340px]'>Должность</h4>
                <h4 className='w-[330px]'>Почта</h4>
                <h4 className='w-[340px]'>Документы</h4>
            </div>
            {selectedBranchId && !isPending &&
                <AnimatePresence>
                    {signers && rowSigners && Object.entries(rowSigners)
                        //.sort((a, b) => +a[0] - +b[0])
                        .map((row, index) =>
                            <React.Fragment key={signers[row[1].objId].id}>
                                <motion.div

                                    layout
                                    initial={{ opacity: 0, x: 0 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    transition={{ duration: 0.3 }}
                                    className={styles["list"]}
                                >

                                    <SelectKit
                                        placeholder='Выберите должность'
                                        width="340px"
                                        selectedId={signers[row[1].objId].jobTitleId}
                                        updateId={(event) =>
                                            setSigners({ [signers[row[1].objId].id]: { ...signers[row[1].objId], jobTitleId: event as number } })}
                                        options={(jobTitles ?? [])}
                                        getValue={val => val.jobTitle}
                                    />
                                    <TextInputKit
                                        name="email"
                                        width='330px'
                                        value={signers[row[1].objId].email}
                                        updateValue={(event) => setSigners({ [signers[row[1].objId].id]: { ...signers[row[1].objId], email: event } })}
                                        placeholder="login@slata.com"
                                    />
                                    {/*<ListCheckboxesKit
                                        width='340px'
                                        options={docsSigners?.[signers[id].id] ?? []}
                                        update={(event) => setDocsSigner({ [signers[id].id]: event })
                                        }
                                        getValue={val => val.name}
                                        getId={val => val.docId}
                                        getCheck={val => val.checked}
                                    />*/}
                                    <TablesButtons
                                        clickTop={() => moveRowUp(+row[0])}
                                        clickDown={() => moveRowDown(+row[0])}
                                        clickDelete={() => deleteRow(+row[0])}
                                    />
                                    {row[1].objId}
                                    {signers[row[1].objId].id}

                                </motion.div>
                            </React.Fragment>

                        )}
                    <motion.div layout className={styles["add-row"]} key="plus">
                        <p>Добавить подписанта</p>
                        <button
                            onClick={createRow}
                        >
                            ✚
                        </button>
                    </motion.div>
                </AnimatePresence>
            }
            {selectedBranchId && isPending &&
                [...Array(2)].map((_, index) =>
                    <div key={index} className={styles["list"]}>
                        <SkeletonKit type='rect' />
                        <SkeletonKit type='rect' />
                        <SkeletonKit type='rect' />
                    </div>
                )
            }
            {!selectedBranchId &&
                <h4 className='pl-[40px] pt-[30px] font-bold'>Здесь пусто</h4>
            }
        </div >
    );
}
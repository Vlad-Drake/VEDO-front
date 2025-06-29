import { SkeletonKit } from '@/shared/ui/skeleton-kit';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './signers-settings.module.scss';
import { SelectKit } from '@/shared/ui/selectKit';
import { TextInputKit } from '@/shared/ui/textInputKit/textInputKit';
import type { DocsSignerRecord, DocTypeModel, SignerModel, SignersRecord } from '../model/use-branch-settings';
import { TablesButtons } from './tables-btns';
import { addRow, deleteRow, moveRowDown, moveRowUp } from '../lib/sortingRow';
import React from 'react';
import type { DocTypesRecord } from '../model/use-doc-types';
import { ListCheckboxesKit } from '@/shared/ui/listCheckboxesKit';

export function SignersSettings({
    selectedBranchId,
    isPending,
    jobTitles,
    signers,
    docTypes,
    docTypesRecord,
    docsSigners,
    setSigners,
    setDocsSigner,
}: {
    selectedBranchId: number | null,
    isPending: boolean,
    jobTitles?: {
        id: number;
        jobTitle: string;
    }[],
    signers?: SignerModel[],
    docsSigners?: DocsSignerRecord,
    docTypes?: {
        id: number;
        docType: string;
    }[],
    docTypesRecord?: DocTypesRecord,
    setSigners: (signers: SignerModel) => void,
    setDocsSigner: (docsSigners: DocsSignerRecord) => void,
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
                    {(signers ?? []).map((signer, index) =>
                        <React.Fragment key={index}>
                            <motion.div
                                key={signer.row}
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
                                    selectedId={signer.jobTitleId}
                                    updateId={(event) =>
                                        setSigners({ ...signer, jobTitleId: event as typeof signer.jobTitleId })}
                                    options={(jobTitles ?? [])}
                                    getValue={val => val.jobTitle}
                                />
                                <TextInputKit
                                    name="email"
                                    width='330px'
                                    value={signer.email}
                                    updateValue={(event) => setSigners({ ...signer, email: event })}
                                    placeholder="login@slata.com"
                                />
                                <ListCheckboxesKit
                                    width='340px'
                                    options={docsSigners?.[signer.id] ?? []}
                                    update={(event) => setDocsSigner({ [signer.id]: event })
                                    }
                                    getValue={val => val.name}
                                    getId={val => val.docId}
                                    getCheck={val => val.checked}
                                />
                                <TablesButtons
                                    clickTop={() => setSigners(moveRowUp(signer.row, signers))}
                                    clickDown={() => setSigners(moveRowDown(signer.row, signers))}
                                    clickDelete={() => setSigners(deleteRow(signer.row, signers))}
                                />
                                {signer.row}
                            </motion.div>
                        </React.Fragment>
                    )
                    }
                    <motion.div layout className={styles["add-row"]} key="plus">
                        <p>Добавить подписанта</p>
                        <button
                            onClick={() =>
                                setSigners(addRow(
                                    signers,
                                    {
                                        jobTitleId: null,
                                        email: '',
                                        docTypes: (docTypes ?? []).map(item => ({
                                            id: item.id,
                                            name: item.docType,
                                            checked: true,
                                        }))
                                    }
                                ))
                            }
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
        </div >
    );
}
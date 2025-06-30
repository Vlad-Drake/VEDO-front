import { SkeletonKit } from '@/shared/ui/skeleton-kit';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './signers-settings.module.scss';
import { SelectKit } from '@/shared/ui/selectKit';
import { TextInputKit } from '@/shared/ui/textInputKit/textInputKit';
import type { DocsSignerRecord, DocTypeModel, SignerModel, SignersRecord } from '../model/use-branch-settings';
import { TablesButtons } from './tables-btns';
import { moveRowDown, moveRowUp } from '../lib/sortingRow';
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
    createRow,
    deleteRow,
}: {
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
    createRow: (signers?: SignersRecord) => void,
    deleteRow: (currentRow: number, signers?: SignersRecord) => void,
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
                    {signers && Object.values(signers)
                    .sort((a,b) => a.row - b.row)
                    .map((signer) => 
                        <React.Fragment key={signer.id}>
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
                                    selectedId={signer.jobTitleId}
                                    updateId={(event) =>
                                        setSigners({ [signer.row]: { ...signer, jobTitleId: event as number } })}
                                    options={(jobTitles ?? [])}
                                    getValue={val => val.jobTitle}
                                />
                                <TextInputKit
                                    name="email"
                                    width='330px'
                                    value={signer.email}
                                    updateValue={(event) => setSigners({[signer.row]: { ...signer, email: event }})}
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
                                    clickTop={() => setSigners( moveRowUp(signer.row, signers) )}
                                    clickDown={() => setSigners( moveRowDown(signer.row, signers) )}
                                    clickDelete={() => deleteRow(signer.row, signers) }
                                />
                                
                                {signer.row}
                            </motion.div>
                        </React.Fragment>
                    )}
                    <motion.div layout className={styles["add-row"]} key="plus">
                        <p>Добавить подписанта</p>
                        <button
                            onClick={() => createRow(signers)}
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
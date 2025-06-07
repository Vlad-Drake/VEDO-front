import { useState, useEffect } from 'react';
import { useLoadingPage } from '@/shared/model/loadingPage';
import { SelectRadioKit } from '@/shared/ui/selectRadioKit/selectRadioKit';
import { useJobTitles } from "@/shared/model/use-job-titles";
import classes from './branch.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { TextInputKit } from '@/shared/ui/textInputKit/textInputKit';
import { useNavigate, href, useParams } from 'react-router-dom';
import { SelectCheckboxKit } from '@/shared/ui/selectCheckboxKit/selectCheckboxKit';
import { useBranchesWithState } from './model/use-branches';
import { useBranchCode } from '@/shared/model/use-branch-codes';
import { useDocTypes } from '@/shared/model/use-doc-types';
import { useBranchSettings, type DocTypeModel } from './model/use-branch-settings';
import { moveRowUp, moveRowDown, deleteRow, addRow } from './helper/sortingRow';

function Branch() {
    const navigate = useNavigate();
    const { branch: branchParam } = useParams<"branch">();
    //const loadingPage = useLoadingPage();

    const branches = useBranchesWithState(branchParam);

    const jobTitles = useJobTitles();
    const branchCode = useBranchCode();
    const docTypes = useDocTypes();

    const branchSettings = useBranchSettings(docTypes.docTypes.data?.list, branches.selectedBranchId);

    const setURL = (value: string) => {
        navigate(href("/branches/:branch", { branch: value }));
    }

    return (
        <div className='gap-[35px] content'>
            <h1 className="text-center">Настройки филиалов</h1>

            <div className="flex flex-row gap-10 justify-start">
                <p
                    className={`w-[200px] content-center text-left`}
                >
                    Выберите филиал:
                </p>
                <SelectRadioKit
                    placeholder='Выберите филиал'
                    width="500px"
                    selectedId={branches.selectedBranchId}
                    updateId={(event) => {
                        const newId = Number(event)
                        branches.setSelectedBranchId(newId);
                    }}
                    updateName={(event) => setURL(event)}
                    options={(branches.branches.data?.list ?? []).map(branch => ({
                        id: branch.id,
                        name: branch.branch
                    }))}
                />
            </div>
            <div className='border-t-2 border-dashed'></div>
            <div className='flex flex-col gap-[10px]'>
                <h2 className="text-left">Подписанты</h2>
                <div className='flex gap-[10px]'>
                    <h3 className='w-[340px]'>Должность</h3>
                    <h3 className='w-[330px]'>Почта</h3>
                    <h3 className='w-[340px]'>Документы</h3>
                </div>
                {branches.selectedBranchId && <AnimatePresence>
                    {
                        branchSettings.signers.map((item, index) => {
                            return (
                                <motion.div
                                    key={item.row}
                                    layout
                                    initial={{ opacity: 0, x: 0 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    transition={{ duration: 0.3 }}
                                    className={classes["list"]}
                                >

                                    <SelectRadioKit
                                        placeholder='Выберите должность'
                                        width="340px"
                                        selectedId={item.jobTitleId}
                                        updateId={(event) => {
                                            const newSigners = [...branchSettings.signers];
                                            newSigners[index] = {
                                                ...newSigners[index],
                                                jobTitleId: event as typeof item.jobTitleId
                                            };
                                            branchSettings.setSigners(newSigners)
                                        }}
                                        options={(jobTitles.jobTitles.data?.list ?? []).map(item => ({
                                            id: item.id,
                                            name: item.jobTitle,
                                        }))}
                                    />
                                    <TextInputKit
                                        name="email"
                                        width='330px'
                                        value={item.email}
                                        updateValue={(event) => {
                                            const newSigners = [...branchSettings.signers];
                                            newSigners[index] = {
                                                ...newSigners[index],
                                                email: event
                                            };
                                            branchSettings.setSigners(newSigners);
                                        }}
                                        placeholder="login@slata.com"
                                    />
                                    <SelectCheckboxKit
                                        width='340px'
                                        options={item.docTypes}
                                        update={(event) => {
                                            branchSettings.setSigners(prev =>
                                                prev.map(signer =>
                                                    signer.row === item.row
                                                        ? {
                                                            ...signer,
                                                            docTypes: event as DocTypeModel[]
                                                        }
                                                        : signer
                                                )
                                            );
                                        }}
                                    />
                                    <div className={classes["list-content__control-row"]}>
                                        <button
                                            onClick={() => branchSettings.setSigners(moveRowUp(item.row, branchSettings.signers))}
                                        >
                                            ▲
                                        </button>
                                        <button
                                            onClick={() => branchSettings.setSigners(moveRowDown(item.row, branchSettings.signers))}
                                        >
                                            ▼
                                        </button>
                                        <button
                                            onClick={() => branchSettings.setSigners(deleteRow(item.row, branchSettings.signers))}
                                        >
                                            ✖
                                        </button>
                                    </div>
                                    {item.row}
                                </motion.div>
                            )
                        })
                    }
                    <motion.div layout className={classes["list-content__add-row"]} key="plus">
                        <p>Добавить подписанта</p>
                        <button
                            onClick={() =>
                                branchSettings.setSigners(addRow(
                                    branchSettings.signers,
                                    {
                                        jobTitleId: null, email: '', docTypes: (docTypes.docTypes.data?.list ?? []).map(item => ({
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
                </AnimatePresence>}

            </div>

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
                                    className={classes["list"]}
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
                                        name="email"
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
                                    <div className={classes["list-content__control-row"]}>
                                        <button
                                            onClick={() => branchSettings.setSettings(moveRowUp(item.row, branchSettings.settings))}
                                        >
                                            ▲
                                        </button>
                                        <button
                                            onClick={() => branchSettings.setSettings(moveRowDown(item.row, branchSettings.settings))}
                                        >
                                            ▼
                                        </button>
                                        <button
                                            onClick={() => branchSettings.setSettings(deleteRow(item.row, branchSettings.settings))}
                                        >
                                            ✖
                                        </button>
                                    </div>
                                    {item.row}
                                </motion.div>
                            )
                        })
                    }
                    <motion.div layout className={classes["list-content__add-row"]} key="plus">
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
            </div>

            <div className='border-t-2 border-dashed'></div>
            <div className='flex flex-col gap-[10px]'>
                <h2 className="text-left">История изменений</h2>
            </div>

        </div>
    );
}

export const Component = Branch;

import { useState, useEffect } from 'react';
import { useLoadingPage } from '@/shared/model/loadingPage';
import { SelectRadioKit } from '@/shared/ui/selectRadioKit/selectRadioKit';
import { useJobTitles } from "@/shared/model/useJobTitles";
import classes from './branch.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { TextInputKit } from '@/shared/ui/textInputKit/textInputKit';
import { useNavigate, href, useParams } from 'react-router-dom';
import { SelectCheckboxKit } from '@/shared/ui/selectCheckboxKit/selectCheckboxKit';
import { useBranches } from './model/use-branches';
import { useBranchCode } from './model/use-branch-code';
import { useDocTypes } from './model/use-doc-types';
import { useBranchSettings } from './model/use-branch-settings';
import { moveRowUp, moveRowDown, deleteRow, addRow } from './helper/sortingRow';

interface SignerModel {
    row: number;
    jobTitleId: number | null;
    email: string;
    docTypes: DocTypeModel[];
}
interface DocTypeModel {
    id: number;//docId
    name: string;
    checked: boolean;
}
interface SettingsModel {
    row: number;
    typeId: number | null;
    code: string;
}

function Branch() {
    const navigate = useNavigate();
    const { branch: branchParam } = useParams<"branch">();
    const loadingPage = useLoadingPage();
  
    const branches = useBranches();
    const [selectedBranchId, setSelectedBranchId] = useState<number | null>(null);
    const jobTitles = useJobTitles();
    const branchCode = useBranchCode();
    const docTypes = useDocTypes();
    const branchSettings = useBranchSettings(selectedBranchId);

    
    const [signers, setSigners] = useState<SignerModel[]>([]);
    const [settings, setSettings] = useState<SettingsModel[]>([]);
    
    useEffect(() => {loadingPage.reset();}, [])
    useEffect(() => {
        loadingPage.loading();
        if(!(branches.branches.isPending || jobTitles.jobTitles.isPending || branchCode.branchCode.isPending || docTypes.docTypes.isPending)) {
            if(branches.branches.isError || jobTitles.jobTitles.isError || branchCode.branchCode.isError || docTypes.docTypes.isError) {
                loadingPage.error(
                    [branches.branches.error ? `Ошибка получения филиалов: ${branches.branches.error.message}` : '',
                    jobTitles.jobTitles.error ? `Ошибка получения должностей: ${jobTitles.jobTitles.error.message}` : '',
                    branchCode.branchCode.error ? `Ошибка получения кодов филиалов: ${branchCode.branchCode.error.message}` : '',
                    docTypes.docTypes.error ? `Ошибка получения кодов документов: ${docTypes.docTypes.error.message}` : ''].join(' ')
                );
            } else {
                branches.setBranchesState(branches.branches.data?.list ?? []);
                if(branchParam && branchParam !== 'all' && selectedBranchId === null) {
                    const item = branches.branches.data?.list.find(item => item.branch === branchParam)
                    setSelectedBranchId(item?.id ?? null);
                }
                jobTitles.setJobTitlesState(jobTitles.jobTitles.data?.list ?? []);
                branchCode.setBranchCodeState(branchCode.branchCode.data?.list ?? []);
                docTypes.setDocTypesState(docTypes.docTypes.data?.list ?? []);
                !loadingPage.loadingPage.errorMessage && loadingPage.done();
                
            }
        }
        if(branchSettings.isPending && selectedBranchId) {
            loadingPage.loading();
        }
        if(branchSettings.isError && selectedBranchId) {
            loadingPage.error(branchSettings.error.message);
        }
        if(branchSettings.status === 'success' && selectedBranchId) {
            setSigners(branchSettings.data.signers.map(item => ({
                ...item,
                docTypes: item.docTypes.map(dt => {
                const found = docTypes.docTypesState.find(dts => dts.id === dt.docId);
                return {
                    id: dt.docId,
                    name: found?.docType ?? '', // если не нашли — пустая строка
                    checked: dt.checked,
                };
                })
            })));
            setSettings(branchSettings.data.settings); //id name checked
            !loadingPage.loadingPage.errorMessage && loadingPage.done();
        }
       
    }, [
        branches.branches.isPending,
        jobTitles.jobTitles.isPending,
        branchCode.branchCode.isPending,
        docTypes.docTypes.isPending,

        selectedBranchId,
        branchSettings.isPending
    ]);

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
                    selectedId={selectedBranchId}
                    updateId={(event) => {
                        const newId = Number(event)
                        setSelectedBranchId(newId);
                    }}
                    updateName={(event) => setURL(event)}
                    options={(branches.branchesState ?? []).map(branch => ({
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
                {selectedBranchId && <AnimatePresence>
                    {
                        signers.map((item, index) => {
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
                                            const newSigners = [...signers];
                                            newSigners[index] = {
                                                ...newSigners[index],
                                                jobTitleId: event as typeof item.jobTitleId
                                            };
                                            setSigners(newSigners)}}
                                        options={(jobTitles.jobTitlesState ?? []).map(item => ({
                                            id: item.id,
                                            name: item.jobTitle,
                                        }))}
                                    />
                                    <TextInputKit
                                        name="email"
                                        width='330px'
                                        value={item.email}
                                        updateValue={(event) => {
                                            const newSigners = [...signers];
                                            newSigners[index] = {
                                                ...newSigners[index],
                                                email: event
                                            };
                                            setSigners(newSigners);
                                        }}
                                        placeholder="login@slata.com"
                                    />
                                    <SelectCheckboxKit
                                        width='340px'
                                        options={item.docTypes}
                                        update={(event) => {
                                            setSigners(prev =>
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
                                            onClick={() => setSigners(moveRowUp(item.row, signers))}
                                        >
                                            ▲
                                        </button>
                                        <button 
                                            onClick={() => setSigners(moveRowDown(item.row, signers))}
                                        >
                                            ▼
                                        </button>
                                        <button
                                            onClick={() => setSigners(deleteRow(item.row, signers))}
                                        >
                                            ✖
                                        </button>
                                    </div>
                                    { item.row }
                                </motion.div>
                            )
                        })
                    }
                    <motion.div layout className={classes["list-content__add-row"]} key="plus">
                        <p>Добавить подписанта</p>
                        <button 
                            onClick={() => 
                                setSigners(addRow(
                                    signers,
                                    {jobTitleId: null, email: '', docTypes: docTypes.docTypesState.map(item => ({
                                        id: item.id,
                                        name: item.docType,
                                        checked: true,
                                    }))}
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
                {selectedBranchId && <AnimatePresence>
                    {
                        settings.map((item, index) => {
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
                                            const newSettings = [...settings];
                                            newSettings[index] = {
                                                ...newSettings[index],
                                                typeId: event as typeof item.typeId
                                            };
                                            setSettings(newSettings)}}
                                        options={(branchCode.branchCodeState ?? []).map(item => ({
                                            id: item.id,
                                            name: item.code,
                                        }))}
                                    />
                                    <TextInputKit
                                        name="email"
                                        width='330px'
                                        value={item.code}
                                        updateValue={(event) => {
                                            const newSettings = [...settings];
                                            newSettings[index] = {
                                                ...newSettings[index],
                                                code: event
                                            };
                                            setSettings(newSettings);
                                        }}
                                        placeholder="Введите значение"
                                    />
                                    <div className={classes["list-content__control-row"]}>
                                        <button 
                                            onClick={() => setSettings(moveRowUp(item.row, settings))}
                                        >
                                            ▲
                                        </button>
                                        <button 
                                            onClick={() => setSettings(moveRowDown(item.row, settings))}
                                        >
                                            ▼
                                        </button>
                                        <button
                                            onClick={() => setSettings(deleteRow(item.row, settings))}
                                        >
                                            ✖
                                        </button>
                                    </div>
                                    { item.row }
                                </motion.div>
                            )
                        })
                    }
                    <motion.div layout className={classes["list-content__add-row"]} key="plus">
                        <p>Добавить код</p>
                        <button onClick={() => setSettings(addRow(settings, {typeId: null, code: ''}))}>
                            ✚
                        </button>
                    </motion.div>
                </AnimatePresence>}
                
            </div>

            <div className='border-t-2 border-dashed'></div>
            <div className='flex flex-col gap-[10px]'>
                <h2 className="text-left">История изменений</h2>
            </div>
            
        </div>
    );
}

export const Component = Branch;

import { useState, useEffect, useMemo, createRef } from 'react';
import { useLoadingPage } from '@/shared/model/loadingPage';
import { SelectRadioKit, type SelectRadioModel } from '@/shared/ui/selectRadioKit/selectRadioKit';
import { useJobTitles } from "@/shared/model/useJobTitles";
import { rqClient } from '@/shared/api/instance';
import classes from './branch.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { TextInputKit } from '@/shared/ui/textInputKit/textInputKit';
import { useLocation, useNavigate, href, useParams } from 'react-router-dom';
import { SelectCheckboxKit, type SelectCheckboxModel } from '@/shared/ui/selectCheckboxKit/selectCheckboxKit';

interface SignerModel {
    row: number;
    signer: string;
    email: string;
    docTypes: DocTypeModel[];
}
interface DocTypeModel {
    doc: string,
    checked: boolean,
}

interface SettingsModel {
    row: number,
    type: string,
    code: string,
}

function Branch() {
    const { branch: branchParam } = useParams<"branch">();
    const navigate = useNavigate();

    const { loadingPage: loadingPageData, loading: loadingPage, error: errorPage, done: donePage } = useLoadingPage();
    const [branch, setBranch] = useState<string>('');
    const [branchesOptions, setBranchesOptions] = useState<SelectRadioModel[]>([]);
    const [jobTitleOptions, setJobTitleOptions] = useState<SelectRadioModel[]>([]);
    const [docTypesOptions, setDocTypesOptions] = useState<SelectCheckboxModel[]>([]);
    const [codeOptions, setCodeOptions] = useState<SelectRadioModel[]>([]);
    const [signers, setSigners] = useState<SignerModel[]>([]);
    const [settings, setSettings] = useState<SettingsModel[]>([]);

    const {
        jobTitles,
        data: dataJT,
        isPending: isPendingJT,
        errorMessage: errorMessageJT,
    } = useJobTitles();
    
    const {
        data: boardQuery,
        isLoading: isPending,
        error,
        isError,
        isSuccess,
    } = rqClient.useQuery('get', '/branches');
    const {
        data: boardQueryBC,
        isLoading: isPendingBC,
        error: errorBC,
        isError: isErrorBC,
        isSuccess: isSuccesssBC,
    } = rqClient.useQuery('get', '/branch-codes');
    const {
        data: boardQueryDT,
        isLoading: isPendingDT,
        error: errorDT,
        isError: isErrorDT,
        isSuccess: isSuccesssDT,
    } = rqClient.useQuery('get', '/doc-types');
    useEffect(() => {
        loadingPage();
        jobTitles({ dummy: "" });
    }, []);
    useEffect(() => {
    
        if(errorMessageJT) {
            console.log('get data', errorMessageJT);
        
            errorPage(errorMessageJT);
        } else if (dataJT) {
            setJobTitleOptions(
                dataJT.data.map((jT, index) => ({
                        id: String(index + 1),
                        name: jT,
                })),
            );
            
            donePage();
        }
      }, [dataJT, errorMessageJT]);
    useEffect(() => {
        if (isPending) {
            loadingPage();
        } else if (isError) {
            errorPage(error?.message || 'Ошибка загрузки данных');
        } else if (isSuccess && boardQuery && boardQueryBC && boardQueryDT) {
            setBranchesOptions(
            boardQuery.list.map((jT, index) => {
                //console.log('test', branchParam && branchParam !== 'all' && jT === branchParam, branchParam, jT)
                if(branchParam && branchParam !== 'all' && jT === branchParam) {
                    setBranch(String(index + 1));
                }
                return ({
                    id: String(index + 1),
                    name: jT,
                })
            }));

            setCodeOptions(
            boardQueryBC.list.map((jT, index) => {
                //console.log('test', branchParam && branchParam !== 'all' && jT === branchParam, branchParam, jT)
                if(branchParam && branchParam !== 'all' && jT === branchParam) {
                    setBranch(String(index + 1));
                }
                return ({
                    id: String(index + 1),
                    name: jT,
                })
            }));

            setDocTypesOptions(
                boardQueryDT.list.map((jT, index) => {
                    return ({
                        id: String(index + 1),
                        name: jT,
                        checked: false,
                    })
                })
            );

            donePage();
        }
    }, [isPending, isError, isSuccess, boardQuery, boardQueryDT, boardQueryBC]);

    const setBranchT = (value: string) => {
        setBranch(value);
    }
    const setURL = (value: string) => {
        navigate(href("/branches/:branch", { branch: value }));
    }

    const {
        data: signersData,
        isLoading: isSignersLoading,
        error: signersError,
    } = rqClient.useQuery('get', '/branch-settings', {
        enabled: !!branch, // ВАЖНО: только если branch есть
        params: {
            query: {
            branch: branch,
            },
        },
    });

    useEffect(() => {
        if (signersData) {
            //console.log("Получены подписанты", signersData);
            setSigners(signersData.signers)
            setSettings(signersData.settings)

        }
        if (signersError) {
            //console.error("Ошибка при получении подписантов", signersError);
        }
    }, [signersData, signersError]);

    const moveRowUp = <T extends { row: number }>(row: number, state: T[]): T[] => {
        const index = state.findIndex((sign) => sign.row === row);
        if (index > 0) {
            const newState = [...state];

            const currentRow = newState[index];
            const prevRow = newState[index - 1];
            
            newState[index] = prevRow;
            newState[index - 1] = currentRow;

            return newState;
        } else {
            return state;
        }
    };
    
    const moveRowDown = <T extends { row: number }>(row: number, state: T[]): T[] => {
        const index = state.findIndex((sign) => sign.row === row);
        if (index < signers.length - 1) {
            const newState = [...state];

            const currentRow = newState[index];
            const prevRow = newState[index + 1];
            
            newState[index] = prevRow;
            newState[index + 1] = currentRow;

            return newState;
        } else {
            return state;
        }
    };
    
    const deleteRow = <T extends { row: number }>(row: number, state: T[]): T[] => {
        return state.filter((sign) => sign.row !== row);
    };

    const addRow = <T extends { row: number }>(state: T[], newRowData: Omit<T, 'row'>): T[] => {
        let maxRow = 1;
        if(state.length > 0) {
            maxRow = Math.max(...state.map(item => item.row)) + 1;
        }
        const newRow: T = { row: maxRow, ...newRowData } as T;
        return [...state, newRow];
    }

    return (
        <div className='gap-[35px] content'>
            <h1 className="text-center">Управление филиалами</h1>

            <div className="flex flex-row gap-10 justify-start">
                <p
                    className={`w-[200px] content-center text-left`}
                >
                    Выберите филиал:
                </p>
                <SelectRadioKit
                    placeholder='Выберите филиал'
                    width="500px"
                    selectedId={branch}
                    updateId={(event) => setBranchT(event)}
                    updateName={(event) => setURL(event)}
                    options={branchesOptions ?? []}
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
                {branch && <AnimatePresence>
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
                                        selectedId={item.signer}
                                        updateId={(event) => {
                                            const newSigners = [...signers];
                                            newSigners[index] = {
                                                ...newSigners[index],
                                                signer: event
                                            };
                                            setSigners(newSigners)}}
                                        options={jobTitleOptions ?? []}
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
                                        options={docTypesOptions}
                                        update={(event) => setDocTypesOptions(event)}
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
                        <button onClick={() => setSigners(addRow(signers, {signer: '', email: '', docTypes: []}))}>
                            ✚
                        </button>
                    </motion.div>
                </AnimatePresence>}
                
            </div>

            <div className='border-t-2 border-dashed'></div>
            <div className='flex flex-col gap-[10px]'>
                <h2 className="text-left">Настройки ТТ</h2>
                {branch && <AnimatePresence>
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
                                        selectedId={item.type}
                                        updateId={(event) => {
                                            const newSettings = [...settings];
                                            newSettings[index] = {
                                                ...newSettings[index],
                                                type: event
                                            };
                                            setSettings(newSettings)}}
                                        options={codeOptions ?? []}
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
                        <button onClick={() => setSettings(addRow(settings, {type: '', code: ''}))}>
                            ✚
                        </button>
                    </motion.div>
                </AnimatePresence>}
                
            </div>
        </div>
    );
}

export const Component = Branch;

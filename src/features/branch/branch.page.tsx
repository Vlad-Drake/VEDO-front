import React from 'react';
import { useState, useEffect } from 'react';
import { useLoadingPage } from '@/shared/model/loadingPage';
import { SelectRadioKit, type SelectRadioModel } from '@/shared/ui/selectRadioKit/selectRadioKit';
import { useJobTitles } from "@/shared/model/useJobTitles";
import { rqClient } from '@/shared/api/instance';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

function Branch() {
    const { loadingPage: loadingPageData, loading: loadingPage, error: errorPage, done: donePage } = useLoadingPage();
    const [branch, setBranch] = useState<string>('');
    const [jobTitleOptions, setJobTitleOptions] = useState<SelectRadioModel[]>([]);
    /*const {
        jobTitles,
        data,
        isPending: isPendingJT,
        errorMessage: errorMessageJT,
    } = useJobTitles();*/

    /*useEffect(() => {
        loading();
        jobTitles({ dummy: "" });
    }, []);
    
    useEffect(() => {
        
        if(errorMessageJT) {
          console.log('get data', errorMessageJT);
    
          error(errorMessageJT);
        } else if (data) {
          setJobTitleOptions(
            data.data.map((jT, index) => ({
              id: String(index + 1),
              name: jT,
            })),
          );
          done();
        }
    }, [data, errorMessageJT]);*/

    const {
        data: boardQuery,
        isLoading: isPending,
        error,
        isError,
        isSuccess,
    } = rqClient.useQuery('get', '/branches');

    useEffect(() => {
    if (isPending) {
        loadingPage();
    } else if (isError) {
        errorPage(error?.message || 'Ошибка загрузки данных');
    } else if (isSuccess && boardQuery) {
        setJobTitleOptions(
        boardQuery.list.map((jT, index) => ({
            id: String(index + 1),
            name: jT,
        }))
        );
        donePage();
    }
    }, [isPending, isError, isSuccess, boardQuery]);

    const setBranchT = (value: string) => {
        setBranch(value);
    }

    const {
        data: signersData,
        isLoading: isSignersLoading,
        error: signersError,
    } = rqClient.useQuery('get', '/signers', {
        enabled: !!branch, // ВАЖНО: только если branch есть
        params: {
            query: {
            branch: branch || "", // или задай дефолт
            },
        },
    });

    useEffect(() => {
        if (signersData) {
            console.log("Получены подписанты", signersData);
        }
        if (signersError) {
            console.error("Ошибка при получении подписантов", signersError);
        }
    }, [signersData, signersError]);

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
                    blured={(event) => setBranchT(event)}
                    options={jobTitleOptions ?? []}
                />
            </div>
            <div className='border-t-2 border-dashed'></div>
            <div className='flex flex-col'>
                <h2 className="text-left">Подписанты</h2>
                <TransitionGroup className="list" component="div">
                    <CSSTransition key={123} timeout={500} classNames="list">
                        <div className="list-item">{'test1'}</div>
                    </CSSTransition>
                </TransitionGroup>
            </div>
        </div>
    );
}

export const Component = Branch;

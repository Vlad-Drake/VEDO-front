import React, { createContext, useContext, useState } from 'react';
import { useChains } from '../model/use-chains';
import classes from './chains-approve.module.scss';
import { ButtonKit } from '@/shared/ui/button-kit';
import { ModalWindow } from '@/shared/ui/modal-window';
import { SkeletonKit } from '@/shared/ui/skeleton-kit';
import { createPortal } from 'react-dom';

interface QueueModel {
    queueId: number;
    jobTitleId: number;
    email: string;
}

export const ChainContext = createContext<ReturnType<typeof useChainModal> | null>(null);

export const useChainModalContext = () => {
    const context = useContext(ChainContext);

    if (!context) {
        throw new Error("useChainModalContext must be used within a ChainModalProvider")
    }

    return context;
}

export function useChainModalOpen() {
    const context = useChainModalContext();

    return {
        updateChain: context.updateChain,
    }
}

export function ChainModalProvider({ children }: { children: React.ReactNode }) {
    const chainModal = useChainModal();

    return (
        <ChainContext.Provider value={chainModal}>
            {children}
        </ChainContext.Provider>
    );
}
type ChainModel = {
    docType: string,
    docSource: string,
    approvers: QueueModel[]
}

const initialChain = {
    docType: '',
    docSource: '',
    approvers: [{
        queueId: 0,
        jobTitleId: 0,
        email: ''
    }]
}

export function useChainModal() {
    const [isShow, setIsShow] = useState(false);

    const [chainState, setChainState] = useState<ChainModel>();
    const [chainCache, setChainCache] = useState<ChainModel>();

    const chain = { ...initialChain, ...chainCache, ...chainState };

    function updateChain(chain: ChainModel) {
        setIsShow(true);
        setChainCache(chain);
    }

    function openModal() {
        setIsShow(true);
    }

    return {
        isShow,
        setIsShow,
        updateChain,
        openModal,
        chainCache,
        chain
    }
}

export function ChainModal({
    updateChain,
}: {
    updateChain: (chain: ChainModel) => void,
}) {

    const { isShow, setIsShow, chain } = useChainModalContext();

    if (!chain) return null;
    return (
        createPortal(

            <ModalWindow
                isShow={isShow}
                onClose={() => setIsShow(false)}
            >
                <div className='w-[700px] flex flex-col'>
                    <h3 className='justify-start'>{chain.docType}</h3>

                    <div className='h-[350px]'>
                        {(chain.approvers ?? []).map(chain =>
                            <p key={chain.email}>{chain.email}</p>
                        )}
                    </div>

                    <div className='flex justify-end gap-[10px]'>
                        <ButtonKit
                            btnStatus='default'
                            btnClick={() => setIsShow(false)}
                            btnType='additional'
                            btnContent='Отмена'
                        />
                        <ButtonKit
                            btnStatus='default'
                            btnClick={() => updateChain(chain)}
                            btnType='primary'
                            btnContent='Сохранить'
                        />
                    </div>

                </div>
            </ModalWindow>

            , document.body)

    );
}

export function ChainsApprove({ branchId }: { branchId: number | null }) {
    const chains = useChains(branchId);

    const { updateChain } = useChainModalOpen();

    function getQueue(approvers: QueueModel[]) {
        const grouped = new Map<number, QueueModel[]>();
        for (const approver of approvers) {
            if (!grouped.has(approver.queueId)) {
                grouped.set(approver.queueId, []);
            }
            grouped.get(approver.queueId)!.push(approver);
        }

        return (
            Array.from(grouped.entries()).map(([queueId, group]) => (
                <React.Fragment key={queueId}>
                    <h1>→</h1>
                    <div className={classes['chain__block_approver']}>
                        {group.map(approver => (
                            <p key={approver.email}>{approver.email}</p>
                        ))}
                    </div>
                </React.Fragment>
            ))
        );
    }

    return (
        <div className='flex flex-col gap-[10px]'>
            <h3 className="text-left">Цепочки согласований</h3>
            {!chains.isPending && <div className={classes['chain_wrapper']}>
                {branchId && (chains.data ?? []).map(item => (
                    <section key={item.docType}>
                        <div className={classes['title']}>

                            <ButtonKit
                                btnContent='Редактировать'
                                btnStatus='default'
                                btnClick={() => updateChain(item)}
                                btnType='primary'
                            />
                            <h3>{item.docType}</h3>

                        </div>
                        <div className={classes['chain']}>
                            <div className={classes['chain__source']}>
                                <h4>{item.docSource}</h4>
                            </div>
                            {getQueue(item.approvers)}
                        </div>
                        <div className='border-t-2 border-dashed'></div>
                    </section>
                ))}
            </div>}
            {!branchId &&
                <h4 className='pl-[40px] pt-[30px] font-bold'>Здесь пусто</h4>
            }
            {branchId && chains.isPending &&
                <SkeletonKit
                    type='rect'
                />
            }
            <ChainModal
                updateChain={chains.updateChain}
            />

        </div>
    );
}
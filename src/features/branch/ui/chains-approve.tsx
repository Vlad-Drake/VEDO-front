import React, { useState } from 'react';
import { useChains } from '../model/use-chains';
import classes from './chains-approve.module.scss';
import { ButtonKit } from '@/shared/ui/buttonKit/buttonKit';
import { ModalWindow } from '@/shared/ui/modalWindow/modalWindow';
import { SkeletonKit } from '@/shared/ui/skeleton-kit';
import { createPortal } from 'react-dom';

interface QueueModel {
    queueId: number;
    jobTitleId: number;
    email: string;
}

export function ChainsApprove({ branchId }: { branchId: number | null }) {
    const chains = useChains(branchId);

    const [isShow, setIsShow] = useState(false);

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
                    <section>
                        <div className={classes['title']}>
                            <h3>{item.docType}</h3>
                            <ButtonKit
                                btnContent='Редактировать'
                                btnStatus='default'
                                btnClick={() => setIsShow(true)}
                                btnType='primary'
                            />
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
            {createPortal(
                <ModalWindow
                    isShow={isShow}
                    onClose={() => setIsShow(false)}
                >
                    <p>test</p>
                </ModalWindow>
                , document.body)
            }

        </div>
    );
}
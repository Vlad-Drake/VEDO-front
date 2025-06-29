import React, { useState } from 'react';
import { useChains } from '../model/use-chains';
import classes from './chains-approve.module.scss';
import { ButtonKit } from '@/shared/ui/buttonKit/buttonKit';
import { ModalWindow } from '@/shared/ui/modalWindow/modalWindow';

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
        <>
            <div className={classes['chain_wrapper']}>
                {(chains.docChains ?? []).map(item => (
                    <section>
                        <div className={classes['title']}>
                            <h2>{item.docType}</h2>
                            <ButtonKit
                                btnContent='Редактировать'
                                btnStatus='default'
                                btnClick={() => setIsShow(true)}
                                btnType='primary'
                            />
                        </div>
                        <div className={classes['chain']}>
                            <div className={classes['chain__source']}>
                                <h3>{item.docSource}</h3>
                            </div>
                            {getQueue(item.approvers)}
                        </div>
                        <div className='border-t-2 border-dashed'></div>
                    </section>
                ))}
            </div>
            <ModalWindow
                isShow={isShow}
                onClose={() => setIsShow(false)}
            >
                <p>test</p>
            </ModalWindow>
        </>
    );
}
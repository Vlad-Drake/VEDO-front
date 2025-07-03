import { ButtonKit } from '@/shared/ui/buttonKit/buttonKit';
import React from 'react';
import { useTutor } from '../tutor';
import { TutorApprovers } from '../tutor/tutor-aprrovers';

export function SignersSettings({
    selectedBranchId,
    children
}: {
    selectedBranchId: number | null,
    children: React.ReactNode,
}) {
    //const { startTutor, currentStep } = useTutor();
    return (
        <div className='flex flex-col gap-[10px]'>
            <div className='flex justify-between'>
                <h3 className="text-left">Подписанты</h3>
                {/*<ButtonKit
                    btnStatus='default'
                    btnClick={startTutor}
                    btnType='primary'
                    btnContent={'Как заполнять таблицу?'}
                />*/}
            </div>
            <div className='flex gap-[10px]'>
                <h4 className='w-[340px]'>Должность</h4>
                <h4 className='w-[330px]'>Почта</h4>
                <div className='flex w-[340px]'><h4 className=''>Документы</h4> ?</div>
            </div>

            {/*<TutorApprovers className={(0 <= currentStep && currentStep <= 2) ? '' : 'hidden'} />*/}

            {selectedBranchId && children}
            {!selectedBranchId &&
                <h4 className='pl-[40px] pt-[30px] font-bold'>Здесь пусто</h4>
            }
        </div >
    );
}
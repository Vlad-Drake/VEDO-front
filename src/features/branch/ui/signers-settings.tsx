import React from 'react';

export function SignersSettings({
    selectedBranchId,
    children
}: {
    selectedBranchId: number | null,
    children: React.ReactNode,
}) {
    return (
        <div className='flex flex-col gap-[10px]'>
            <h3 className="text-left">Подписанты</h3>
            <div className='flex gap-[10px]'>
                <h4 className='w-[340px]'>Должность</h4>
                <h4 className='w-[330px]'>Почта</h4>
                <h4 className='w-[340px]'>Документы</h4>
            </div>
            {selectedBranchId && children}
            {!selectedBranchId &&
                <h4 className='pl-[40px] pt-[30px] font-bold'>Здесь пусто</h4>
            }
        </div >
    );
}
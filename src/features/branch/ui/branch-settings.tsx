export function BranchSettings({
    selectedBranchId,
    children,
}: {
    selectedBranchId: number | null,
    children: React.ReactNode,
}) {
    return (
        <div className='flex flex-col gap-[10px]'>
            <h3 className="text-left">Настройки ТТ</h3>
            <div className='flex gap-[10px]'>
                <h4 className='w-[340px]'>Тип кода</h4>
                <h4 className='w-[330px]'>Код</h4>
            </div>
            {selectedBranchId && children}
            {!selectedBranchId &&
                <h4 className='pl-[40px] pt-[30px] font-bold'>Здесь пусто</h4>
            }
        </div>
    );
}
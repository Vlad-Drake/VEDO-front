export function Page({ children }: { children: React.ReactNode }) {
    return (
        <div className='gap-[35px] content'>
            <h2 className="text-center">Настройки филиалов</h2>
            {children}
        </div>
    );
}
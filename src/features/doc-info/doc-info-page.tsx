export function Page({ children }: { children: React.ReactNode }) {
    return (
        <div className="gap-[35px] content">
            <h2 className="text-center">Информация о документах</h2>
            {/* Если информация изменилась, можете её изменить. Редактирование включается двойным щелчком по тексту.*/}
            <p>Здесь вы можете получить акутальную информацию о документах. Время хранения документов в ИС - 5 лет</p>
            {children}
        </div>
    );
}

function AdminPanel() {



    return (
        <div className="gap-[35px] content">
            <h2 className="text-center">Управление доступами</h2>

            <div className="flex flex-row gap-10 justify-start">
                <p
                    className={`w-[200px] content-center text-left`}
                >
                    Укажите пользователя (ФИО или email):
                </p>

            </div>


        </div>
    );
}

export const Component = AdminPanel;

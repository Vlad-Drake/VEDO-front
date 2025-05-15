import { TextInputKit } from '@/shared/ui/textInputKit/textInputKit';
import { NotificationKit } from '@/shared/ui/notificationKit/notificationKit';
import { ButtonKit } from '@/shared/ui/buttonKit/buttonKit';
import { useLogin } from './model/useLogin';

function Login() {
    const { login, isPending, errorMessage } = useLogin();
    console.log(isPending)
    console.log(errorMessage)
    function testLogin() {
        login({user: 'v.ermakov@slata.com', password: 'W1ner2ko0Nnnnn'});
    }

    return (
        <div className="min-h-screen flex flex-col justify-center">
            <div className="flex justify-center items-center text-[#F4F4F4]">
                <div className="flex w-[800px] min-h-[450px]">
                
                    <div className="right-side">
                        <div className="right-side__block">
                            <div className="right-side__item">
                                <h1>Вход</h1>
                            </div>
                            <div className="right-side__item">
                                <label>Логин</label>
                                <TextInputKit
                                    value={''}
                                    updateValue={(value) => console.log(value)}
                                    placeholder="login@slata.com"
                                />
                            </div>
                            <div className="right-side__item">
                                <label>Пароль</label>
                                <TextInputKit
                                    value={''}
                                    updateValue={(value) => console.log(value)}
                                    placeholder="Пароль"
                                    password={true}
                                />
                            </div>
                            <div className="right-side__btn">
                                <ButtonKit 
                                    btnClick={testLogin}
                                    btnContent={<><p>Войти</p></>}
                                    btnStatus='default'
                                /> {/*className="btn"*/}
                                
                            </div>
                            <div className="right-side__item">
                                <NotificationKit
                                    type='error'
                                >
                                    {'text'}
                                </NotificationKit>
                            </div>
                            
                        </div>
                        
                    </div>
                    
                </div>
            </div>
            
        </div>
    );
}

export const Component = Login;
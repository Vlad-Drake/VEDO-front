import { useState, useEffect, useMemo } from 'react';
import { TextInputKit } from "@/shared/ui/textInputKit/textInputKit";
import { FormRowLayout } from './form-row-layout';
import { SelectRadioKit } from '@/shared/ui/selectRadioKit/selectRadioKit';
import { ButtonKit, type BtnStatuses } from '@/shared/ui/buttonKit/buttonKit';
import { NotificationKit } from "@/shared/ui/notificationKit/notificationKit";
import { useRegisterUser } from './model/useRegisterUser';
import { z } from 'zod';

const registerUserschema = z.object({
    lastName: z.string().nonempty('Укажите фамилию'),
    firstName: z.string().nonempty('Укажите имя'),
    jobTitle: z.string().nonempty('Выберите должность'),
    code1C: z.string().nonempty('Укажите код 1с'),
    email: z.string().nonempty('Укажите почту').email('Неверный формат почты'),
    pinCode: z.string().nonempty('Укажите пин-код'),
});

type ValidRegUser = z.infer<typeof registerUserschema>;

type RegisterUser = ValidRegUser & {
    middleName: string,
    codeSm: string,
    codeSymphony: string,
    codeTcd: string,
    codeInfor: string,
    codeDax: string,
}

function RegistationUser() {
    const initialRegisterUserModel: RegisterUser = {
        lastName: '',
        firstName: '',
        middleName: '',
        jobTitle: '',
        code1C: '',
        email: '',
        codeSm: '',
        codeSymphony: '',
        codeTcd: '',
        codeInfor: '',
        codeDax: '',
        pinCode: ''
    };
    const [registerUserModel, setRegisterUserModel] = useState<RegisterUser>(initialRegisterUserModel);
    const [ errors, setErrors ] = useState(initialRegisterUserModel);
    const [btnStatus, setBtnStatus] = useState<BtnStatuses>('default');
    
    const { registerUser, isPending, errorMessage } = useRegisterUser();

    const validateField = (field: keyof ValidRegUser, value: string) => {
        const result = registerUserschema.shape[field].safeParse(value);
        setErrors(prev => ({
            ...prev,
            [field]: result.success ? '' : result.error.issues[0].message
        }));
    
        return result.success;
    };

    const handlerSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        registerUser(registerUserModel);
    }

    const validate = (): boolean => {
        const result = registerUserschema.safeParse(registerUserModel);
        return result.success;
    }

    const handleChange = (e: string, field: keyof RegisterUser) => {
        setRegisterUserModel({...registerUserModel, [field]: e})
        
    }

    const isFormValid = useMemo(() => {
        return validate();
    }, [registerUserModel]);

    useEffect(() => {
        isFormValid ? ( isPending ? setBtnStatus('loading') : setBtnStatus('default') ) : setBtnStatus('disabled');
    }, [isPending, isFormValid])

    return (
        <div className="gap-[35px] content">
            <h1 className="text-center">Регистрация пользователя</h1>

            <form className="flex flex-col gap-[20px]" onSubmit={handlerSubmit}>
                <FormRowLayout
                    text="Фамилия"
                    input={
                        <TextInputKit
                            value={registerUserModel.lastName}
                            placeholder="*Фамилия"
                            width="500px"
                            updateValue={event => handleChange(event, 'lastName')}
                            blured={() => validateField('lastName', registerUserModel.lastName)}
                            error={errors.lastName}
                        />
                    }
                />
                <FormRowLayout
                    text="Имя"
                    input={
                        <TextInputKit
                            value={registerUserModel.firstName}
                            placeholder="*Имя"
                            width="500px"
                            updateValue={event => handleChange(event, 'firstName')}
                            blured={() => validateField('firstName', registerUserModel.firstName)}
                            error={errors.firstName}
                        />
                    }
                />
                <FormRowLayout
                    text="Отчество"
                    input={
                        <TextInputKit
                            value={registerUserModel.middleName}
                            placeholder="Отчество"
                            width="500px"
                            updateValue={event => handleChange(event, 'middleName')}
                        />
                    }
                />
                <FormRowLayout
                    text="Должность"
                    input={
                        <SelectRadioKit
                            selectedId={registerUserModel.jobTitle}
                            updateId={event => handleChange(event, 'jobTitle')}
                            width="500px"
                            placeholder='*Должность'
                            options={[{ id: '1', name: '1' }, { id: '2', name: '2' }]}
                            blured={(event) => validateField('jobTitle', event)}
                            error={errors.jobTitle}
                        />
                    }
                />
                <FormRowLayout
                    text="Код 1С"
                    input={
                        <TextInputKit
                            value={registerUserModel.code1C}
                            placeholder="*Код 1С"
                            width="500px"
                            updateValue={event => handleChange(event, 'code1C')}
                            blured={() => validateField('code1C', registerUserModel.code1C)}
                            error={errors.code1C}
                        />
                    }
                />
                <FormRowLayout
                    text="Почта"
                    input={
                        <TextInputKit
                            value={registerUserModel.email}
                            placeholder="*Почта"
                            width="500px"
                            name='email'
                            updateValue={event => handleChange(event, 'email')}
                            blured={() => validateField('email', registerUserModel.email)}
                            error={errors.email}
                        />
                    }
                />
                <FormRowLayout
                    text="Код SM"
                    input={
                        <TextInputKit
                            value={registerUserModel.codeSm}
                            placeholder="Код SM"
                            width="500px"
                            updateValue={event => handleChange(event, 'codeSm')}
                        />
                    }
                />
                <FormRowLayout
                    text="Код Symphony"
                    input={
                        <TextInputKit
                            value={registerUserModel.codeSymphony}
                            placeholder="Код Symphony"
                            width="500px"
                            updateValue={event => handleChange(event, 'codeSymphony')}
                        />
                    }
                />
                <FormRowLayout
                    text="Код TCD"
                    input={
                        <TextInputKit
                            value={registerUserModel.codeTcd}
                            placeholder="Код TCD"
                            width="500px"
                            updateValue={event => handleChange(event, 'codeTcd')}
                        />
                    }
                />
                <FormRowLayout
                    text="Код Infor"
                    input={
                        <TextInputKit
                            value={registerUserModel.codeInfor}
                            placeholder="Код Infor"
                            width="500px"
                            updateValue={event => handleChange(event, 'codeInfor')}
                        />
                    }
                />
                <FormRowLayout
                    text="Код DAX"
                    input={
                        <TextInputKit
                            value={registerUserModel.codeDax}
                            placeholder="Код DAX"
                            width="500px"
                            updateValue={event => handleChange(event, 'codeDax')}
                        />
                    }
                />
                <FormRowLayout
                    text="Пин-код"
                    input={
                        <TextInputKit
                            value={registerUserModel.pinCode}
                            placeholder="*Пин-код"
                            width="500px"
                            updateValue={event => handleChange(event, 'pinCode')}
                            blured={() => validateField('pinCode', registerUserModel.pinCode)}
                            error={errors.pinCode}
                        />
                    }
                />
                <div className="flex justify-center">
                    <ButtonKit 
                        btnClick={() => 1}
                        btnContent={<p>Зарегистрировать</p>}
                        btnStatus={btnStatus}
                        type='submit'
                        btnType='primary'
                    />
                </div>
                <div className="flex justify-center">
                    <NotificationKit
                        type='error'
                    >
                        {errorMessage}
                    </NotificationKit>
                </div>
            </form>

        </div>
    );
}

export const Component = RegistationUser;
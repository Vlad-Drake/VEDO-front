import { useState } from "react";
import { TextInputKit } from "@/shared/ui/textInputKit/textInputKit";
import { FormRowLayout } from "./form-row-layout";
import {
    SelectRadioKit,
} from "@/shared/ui/selectRadioKit/selectRadioKit";
import { ButtonKit } from "@/shared/ui/buttonKit/buttonKit";
import { NotificationKit } from "@/shared/ui/notificationKit/notificationKit";
import { useRegisterUser } from "./model/use-register-user";
import { z } from "zod";
import { useJobTitles } from "@/shared/model/use-job-titles";

const registerUserschema = z.object({
    lastName: z.string().nonempty("Укажите фамилию"),
    firstName: z.string().nonempty("Укажите имя"),
    jobTitle: z.string().nonempty("Выберите должность"),
    code1C: z.string().nonempty("Укажите код 1с"),
    email: z.string().nonempty("Укажите почту").email("Неверный формат почты"),
    pinCode: z.string().nonempty("Укажите пин-код"),
    middleName: z.string(),
    codeSm: z.string(),
    codeSymphony: z.string(),
    codeTcd: z.string(),
    codeInfor: z.string(),
    codeDax: z.string(),
});

type ValidRegUser = z.infer<typeof registerUserschema>;

type RegisterUser = ValidRegUser; /* & {
    middleName: string,
    codeSm: string,
    codeSymphony: string,
    codeTcd: string,
    codeInfor: string,
    codeDax: string,
}*/

type FormField = {
    fieldName: keyof RegisterUser;
    label: string;
    required: boolean;
    type: "text" | "select";
    name?: string;
};

const formFields: FormField[] = [
    { fieldName: "lastName", label: "Фамилия", required: true, type: "text" },
    { fieldName: "firstName", label: "Имя", required: true, type: "text" },
    { fieldName: "middleName", label: "Отчество", required: false, type: "text" },
    { fieldName: "jobTitle", label: "Должность", required: true, type: "select" },
    { fieldName: "code1C", label: "Код 1С", required: true, type: "text" },
    {
        fieldName: "email",
        label: "Почта",
        required: true,
        type: "text",
        name: "email",
    },
    { fieldName: "codeSm", label: "Код SM", required: false, type: "text" },
    {
        fieldName: "codeSymphony",
        label: "Код Symphony",
        required: false,
        type: "text",
    },
    { fieldName: "codeTcd", label: "Код TCD", required: false, type: "text" },
    { fieldName: "codeInfor", label: "Код Infor", required: false, type: "text" },
    { fieldName: "codeDax", label: "Код DAX", required: false, type: "text" },
    { fieldName: "pinCode", label: "Пин-код", required: true, type: "text" },
];

const initialRegisterUserModel: RegisterUser = {
    lastName: "",
    firstName: "",
    middleName: "",
    jobTitle: "",
    code1C: "",
    email: "",
    codeSm: "",
    codeSymphony: "",
    codeTcd: "",
    codeInfor: "",
    codeDax: "",
    pinCode: "",
};

function RegistationUser() {
    //const loadingPage = useLoadingPage();
    const jobTitles = useJobTitles();

    const [registerUserModel, setRegisterUserModel] = useState<RegisterUser>(initialRegisterUserModel);
    const [errors, setErrors] = useState<Partial<Record<keyof RegisterUser, string>>>({})

    const { registerUser, isPending, errorMessage } = useRegisterUser(resetForm);

    const validateField = (field: keyof ValidRegUser, value: string): void => {
        const result = registerUserschema.shape[field].safeParse(value);

        const newErrors: Partial<Record<keyof RegisterUser, string>> = { ...errors };
        if (!result.success) {
            result.error.issues.forEach((issue) => {
                newErrors[field] = issue.message;
            });
            setErrors(newErrors);
            return;
        }
        delete newErrors[field];
        setErrors(newErrors);
    };

    const validateForm = (): boolean => {
        const result = registerUserschema.safeParse(registerUserModel);
        if (!result.success) {
            const newErrors: Partial<Record<keyof RegisterUser, string>> = {};

            result.error.issues.forEach((issue) => {
                const field = issue.path[0] as keyof RegisterUser;
                newErrors[field] = issue.message;
            })

            setErrors(newErrors);
            return false;
        }

        setErrors({});
        return true;
    };

    const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;
        registerUser(registerUserModel);

    };

    function resetForm() {
        setRegisterUserModel(initialRegisterUserModel);
    }

    const handleChange = (e: string, field: keyof RegisterUser) => {
        setRegisterUserModel({ ...registerUserModel, [field]: e });
    };

    const renderFormField = (field: (typeof formFields)[0]) => {
        const commonProps = {
            value: registerUserModel[field.fieldName],
            name: field.name,
            placeholder: field.required ? `*${field.label}` : field.label,
            width: "500px",
            updateValue: (event: string) => handleChange(event, field.fieldName),
            error: errors[field.fieldName],
            ...(field.required && {
                blured: () =>
                    validateField(field.fieldName, registerUserModel[field.fieldName]),
            }),
        };
        return (
            <FormRowLayout
                key={field.label}
                text={field.label}
                input={
                    field.type === "select" ? (
                        <SelectRadioKit
                            {...commonProps}
                            selectedId={registerUserModel[field.fieldName]}
                            updateId={(event) => handleChange(String(event), field.fieldName)}
                            blured={(event) => validateField(field.fieldName, String(event))}
                            options={field.fieldName === "jobTitle" ? (jobTitles.jobTitles.data?.list ?? []).map(item => ({
                                id: item.id,
                                name: item.jobTitle,
                            })) : []}
                        />
                    ) : (
                        <TextInputKit {...commonProps} />
                    )
                }
            />
        );
    };

    return (
        <div className="gap-[35px] content">
            <h1 className="text-center">Регистрация пользователя</h1>

            <form className="flex flex-col gap-[20px]" onSubmit={handlerSubmit}>
                {formFields.map(renderFormField)}

                <div className="flex justify-center">
                    <ButtonKit
                        btnClick={() => 1}
                        btnContent={<p>Зарегистрировать</p>}
                        btnStatus={isPending ? 'loading' : 'default'}
                        type="submit"
                        btnType="primary"
                    />
                </div>
                <div className="flex justify-center">
                    <NotificationKit type="error">{errorMessage}</NotificationKit>
                </div>
            </form>
        </div>
    );
}

export const Component = RegistationUser;

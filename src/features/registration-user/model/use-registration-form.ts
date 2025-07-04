import { useState } from "react";
import { z } from "zod";
import { useRegisterUser } from "./use-register-user";

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

export type RegisterUserModel = ValidRegUser;

const initialRegisterUser: RegisterUserModel = {
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

export function useRegistrationForm() {
    const [registerUser, setRegisterUserModel] = useState<RegisterUserModel>(initialRegisterUser);
    const [errors, setErrors] = useState<Partial<Record<keyof RegisterUserModel, string>>>({})

    const { registerUserQuery, isPending, errorMessage, successMessage } = useRegisterUser(resetForm);

    const validateField = (field: keyof ValidRegUser, value: string): void => {
        const result = registerUserschema.shape[field].safeParse(value);

        const newErrors: Partial<Record<keyof RegisterUserModel, string>> = { ...errors };
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
        const result = registerUserschema.safeParse(registerUser);
        if (!result.success) {
            const newErrors: Partial<Record<keyof RegisterUserModel, string>> = {};

            result.error.issues.forEach((issue) => {
                const field = issue.path[0] as keyof RegisterUserModel;
                newErrors[field] = issue.message;
            })

            setErrors(newErrors);
            return false;
        }

        setErrors({});
        return true;
    };

    function resetForm() {
        setRegisterUserModel(initialRegisterUser);
    }

    const handleChange = (e: string, field: keyof RegisterUserModel) => {
        setRegisterUserModel({ ...registerUser, [field]: e });
    };

    const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;
        registerUserQuery(registerUser);

    };

    return {
        registerUser,
        errors,
        isPending,
        errorMessage,
        validateField,
        handleChange,
        handlerSubmit,
        successMessage
    };
}
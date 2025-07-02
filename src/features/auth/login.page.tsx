import { useState } from "react";
import { TextInputKit } from "@/shared/ui/textInputKit/textInputKit";
import { NotificationKit } from "@/shared/ui/notificationKit/notificationKit";
import { ButtonKit } from "@/shared/ui/buttonKit/buttonKit";
import { useLogin } from "./model/use-login";
import { z } from "zod";

const loginSchema = z.object({
    user: z.string().nonempty("Введите почту").email("Неверный email"),
    password: z.string().nonempty("Введите пароль"),
});

type User = z.infer<typeof loginSchema>;

type ErrorForm = Record<keyof User, string>

function Login() {
    const [user, setUser] = useState<User>({ user: "", password: "" });
    const [errors, setErrors] = useState<Partial<ErrorForm>>({});

    const { login, isPending, errorMessage } = useLogin();

    const validateField = (field: keyof User, value: unknown) => {
        const result = loginSchema.shape[field].safeParse(value);
        /*setErrors((prev) => ({
          ...prev,
          [field]: result.success ? "" : result.error.issues[0].message,
        }));*/
        const newErrors: Partial<ErrorForm> = { ...errors };
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
        const result = loginSchema.safeParse(user);
        if (!result.success) {
            const newErrors: Partial<ErrorForm> = {};

            result.error.issues.forEach((issue) => {
                const field = issue.path[0] as keyof User;
                newErrors[field] = issue.message;
            });

            setErrors(newErrors);
            return false;
        }

        setErrors({});
        return true;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;
        login(user);
    };

    return (
        <div className="flex flex-col justify-center">
            <div className="flex justify-center items-center text-[#F4F4F4]">
                <div className="flex w-[800px] min-h-[450px]">
                    <div
                        className="right-side flex justify-center gap-[15px] p-[10px] w-[100%] shadow-[5px_5px_16px_1px_#3A3A3A] bg-cover"
                        style={{
                            backgroundImage: "url('./src/features/auth/assets/_normal.jpg')",
                        }}
                    >
                        <form
                            className="right-side__block flex flex-col gap-[15px] w-[50%] p-[10px] bg-[#4358393f] rounded-[4px]"
                            onSubmit={handleSubmit}
                        >
                            <div className="right-side__item">
                                <h1 className="text-center">Вход</h1>
                            </div>
                            <div className="right-side__item">
                                <label>Логин</label>
                                <TextInputKit
                                    name="email"
                                    value={user.user}
                                    updateValue={(event) => setUser({ ...user, user: event })}
                                    placeholder="login@slata.com"
                                    blured={() => validateField("user", user.user)}
                                    error={errors.user}
                                />
                            </div>
                            <div className="right-side__item">
                                <label>Пароль</label>
                                <TextInputKit
                                    name="password"
                                    password={true}
                                    value={user.password}
                                    updateValue={(event) => setUser({ ...user, password: event })}
                                    placeholder="Пароль"
                                    blured={() => validateField("password", user.password)}
                                    error={errors.password}
                                />
                            </div>
                            <div className="right-side__btn text-center">
                                <ButtonKit
                                    btnClick={() => 1}
                                    btnContent={<p>Войти</p>}
                                    btnStatus={isPending ? 'loading' : 'default'}
                                    type="submit"
                                    btnType="primary"
                                    btnWidth="80%"
                                />
                                {/*className="btn"*/}
                            </div>
                            <div className="right-side__item">
                                <NotificationKit type="error">{errorMessage}</NotificationKit>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const Component = Login;

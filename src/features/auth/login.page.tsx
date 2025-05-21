import { useState, useEffect } from "react";
import { TextInputKit } from "@/shared/ui/textInputKit/textInputKit";
import { NotificationKit } from "@/shared/ui/notificationKit/notificationKit";
import { ButtonKit, type BtnStatuses } from "@/shared/ui/buttonKit/buttonKit";
import { useLogin } from "./model/useLogin";
import { z } from "zod";
import { useLoadingPage } from "@/shared/model/loadingPage";

const loginSchema = z.object({
  user: z.string().nonempty("Введите почту").email("Неверный email"),
  password: z.string().nonempty("Введите пароль"),
});

type User = z.infer<typeof loginSchema>;

function Login() {
  const [user, setUser] = useState<User>({ user: "", password: "" });
  const [errors, setErrors] = useState<User>({ user: "", password: "" });
  const [btnStatus, setBtnStatus] = useState<BtnStatuses>("default");
  const { loadingPage, loading, error, done } = useLoadingPage();
  done();
  const { login, isPending, errorMessage } = useLogin();

  useEffect(() => {
    isPending ? setBtnStatus("loading") : setBtnStatus("default");
  }, [isPending]);

  const validateField = (field: keyof User, value: any) => {
    const result = loginSchema.shape[field].safeParse(value);
    console.log(result);
    setErrors((prev) => ({
      ...prev,
      [field]: result.success ? "" : result.error.issues[0].message,
    }));

    return result.success;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(user);
  };

  return (
    <div className="flex flex-col justify-center">
      {/*min-h-screen */}
      <div className="flex justify-center items-center text-[#F4F4F4]">
        <div className="flex w-[800px] min-h-[450px]">
          <div
            className="right-side flex justify-center gap-[15px] p-[10px] w-[100%] shadow-[5px_5px_16px_1px_#3A3A3A] bg-cover"
            style={{
              backgroundImage: "url('./src/features/auth/assets/_normal.jpg')",
            }}
          >
            <form
              className="right-side__block flex flex-col gap-[15px] w-[50%] p-[10px] bg-[#3E5B3150]"
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
                  btnStatus={btnStatus}
                  type="submit"
                  btnType="primary"
                  btnWidth="80%"
                />{" "}
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

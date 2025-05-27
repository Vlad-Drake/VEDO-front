import { useState, useEffect, useMemo } from "react";
import { TextInputKit } from "@/shared/ui/textInputKit/textInputKit";
import { FormRowLayout } from "./form-row-layout";
import {
  SelectRadioKit,
  type SelectRadioModel,
} from "@/shared/ui/selectRadioKit/selectRadioKit";
import { ButtonKit, type BtnStatuses } from "@/shared/ui/buttonKit/buttonKit";
import { NotificationKit } from "@/shared/ui/notificationKit/notificationKit";
import { useRegisterUser } from "./model/useRegisterUser";
import { useJobTitles } from "@/shared/model/useJobTitles";
import { z } from "zod";
import { useLoadingPage } from "@/shared/model/loadingPage";

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

function RegistationUser() {
  const [jobTitleOptions, setJobTitleOptions] = useState<SelectRadioModel[]>(
    [],
  );
  const { loadingPage, loading, error, done } = useLoadingPage();
  const {
    jobTitles,
    data,
    isPending: isPendingJT,
    errorMessage: errorMessageJT,
  } = useJobTitles();

  useEffect(() => {
    loading();
    jobTitles({ dummy: "" });
  }, []);

  useEffect(() => {
    
    if(errorMessageJT) {
      console.log('get data', errorMessageJT);

      error(errorMessageJT);
    } else if (data) {
      setJobTitleOptions(
        data.data.map((jT, index) => ({
          id: String(index + 1),
          name: jT,
        })),
      );
      done();
    }
  }, [data, errorMessageJT]);

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
  const [registerUserModel, setRegisterUserModel] = useState<RegisterUser>(
    initialRegisterUserModel,
  );
  const [errors, setErrors] = useState(initialRegisterUserModel);
  const [btnStatus, setBtnStatus] = useState<BtnStatuses>("default");

  const { registerUser, isPending, errorMessage } = useRegisterUser();

  const validateField = (field: keyof ValidRegUser, value: string): void => {
    const result = registerUserschema.shape[field].safeParse(value);
    setErrors((prev) => ({
      ...prev,
      [field]: result.success ? "" : result.error.issues[0].message,
    }));

    return /*result.success*/;
  };

  const handlerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerUser(registerUserModel);
  };

  const validate = (): boolean => {
    const result = registerUserschema.safeParse(registerUserModel);
    return result.success;
  };

  const handleChange = (e: string, field: keyof RegisterUser) => {
    setRegisterUserModel({ ...registerUserModel, [field]: e });
  };

  const isFormValid = useMemo(() => {
    return validate();
  }, [registerUserModel]);

  useEffect(() => {
    isFormValid
      ? isPending
        ? setBtnStatus("loading")
        : setBtnStatus("default")
      : setBtnStatus("disabled");
  }, [isPending, isFormValid]);

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
              updateId={(event) => handleChange(event, field.fieldName)}
              blured={(event) => validateField(field.fieldName, event)}
              options={field.fieldName === "jobTitle" ? jobTitleOptions : []}
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
            btnStatus={btnStatus}
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

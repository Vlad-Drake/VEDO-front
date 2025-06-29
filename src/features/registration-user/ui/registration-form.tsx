import { useJobTitles } from "@/shared/model/use-job-titles";
import { ButtonKit } from "@/shared/ui/buttonKit/buttonKit";
import { NotificationKit } from "@/shared/ui/notificationKit/notificationKit";
import { SelectKit } from "@/shared/ui/selectKit";
import { useRegistrationForm, type RegisterUserModel } from "../model/use-registration-form";
import { FormRowLayout } from "./form-row-layout";
import { TextInputKit } from "@/shared/ui/textInputKit/textInputKit";

type FormField = {
    fieldName: keyof RegisterUserModel;
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

export function RegistrationForm() {
    const jobTitles = useJobTitles();
    const {
        registerUser,
        errors,
        isPending,
        errorMessage,
        validateField,
        handleChange,
        handlerSubmit
    } = useRegistrationForm();

    const renderFormField = (field: FormField) => {
        const commonProps = {
            value: registerUser[field.fieldName],
            name: field.name,
            placeholder: field.required ? `*${field.label}` : field.label,
            width: "500px",
            updateValue: (event: string) => handleChange(event, field.fieldName),
            error: errors[field.fieldName],
            ...(field.required && {
                blured: () =>
                    validateField(field.fieldName, registerUser[field.fieldName]),
            }),
        };
        return (
            <FormRowLayout
                key={field.label}
                text={field.label}
                input={
                    field.type === "select" ? (
                        <SelectKit
                            {...commonProps}
                            selectedId={registerUser[field.fieldName]}
                            updateId={(event) => handleChange(String(event), field.fieldName)}
                            blured={(event) => validateField(field.fieldName, String(event))}
                            options={field.fieldName === "jobTitle" ? (jobTitles.jobTitles.data?.list ?? []) : []}
                            getValue={val => val.jobTitle}
                        />
                    ) : (
                        <TextInputKit {...commonProps} />
                    )
                }
            />
        );
    };

    return (
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
    );
}
import classes from "./textInput.module.scss";

export function TextInputKit({
  password = false,
  value,
  width = "auto",
  placeholder = "Заполните поле",
  name,
  updateValue,
  onBlur,
  onFocus,
  error,
  ...props
}: {
  password?: boolean;
  value: string | undefined;
  width?: string;
  placeholder?: string;
  name?: string;
  updateValue: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateValue(e.target.value);
  };

  return (
    <div className={classes["text-editor"]} style={{ width }} >
      <input
        name={name}
        type={password ? "password" : "text"}
        className={error ? classes["error-color"] : ""}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        onBlur={onBlur}
        onFocus={onFocus}
        {...props}
      />
      {error && <span className={classes["error-text"]}>{error}</span>}
    </div >
  );
}

import classes from './textInput.module.scss';

export function TextInputKit({
    password = false,
    validate = true,
    value,
    width = 'auto',
    placeholder = 'Заполните поле',
    name,
    updateValue,
    blured,
    focused,
    error,
}:{
    password?: boolean,
    validate?: boolean,
    value: string | undefined,
    width?: string,
    placeholder?: string,
    name?: string,
    updateValue: (value: string) => void,
    blured?: () => void,
    focused?: () => void,
    error?: string,
}) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateValue(e.target.value);
    }

    return (
        <div className={classes["text-editor"]} style={{ width }}>
            <input
                name={name}
                type={password ? 'password' : 'text'}
                className={!validate ? classes["error-color"] : ''}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                onBlur={blured}
                onFocus={focused}
            />
            {error && <span className={classes["error-text"]}>{error}</span>}
        </div>
    );
}
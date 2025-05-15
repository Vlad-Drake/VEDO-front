import classes from './input.module.scss';

export function InputKit({
    password,
    validate,
    value,
    width = 'auto',
    placeholder = 'Заполните поле',
    updateValue,
    blured,
    focused,
}:{
    password: boolean,
    validate: boolean,
    value: string,
    width?: string,
    placeholder?: string,
    updateValue: (value: string) => void,
    blured?: () => void,
    focused?: () => void,
}) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateValue(e.target.value);
    }

    return (
        <div className={classes["text-editor"]} style={{ width }}>
            <input
                type={password ? 'password' : 'text'}
                className={!validate ? classes["error-color"] : ''}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                onBlur={blured}
                onFocus={focused}
            />
        </div>
    );
}
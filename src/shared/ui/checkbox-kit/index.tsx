import classes from './checkboxKit.module.scss';
import Checkbox_ico from './assets/checkbox.svg';

export function CheckboxKit({
    checked,
    onClick,
}: {
    checked: boolean,
    onClick?: () => void,
}) {
    return (
        <div
            className={`${classes["checkbox-wrapper"]} ${checked ? classes['checked'] : ''}`}
            onClick={onClick}
        >
            <div className={classes["checkbox"]} onClick={onClick}>
                {checked && (<img src={Checkbox_ico} alt="" className={classes["checkmark"]} />)}
            </div>
        </div>

    );
}
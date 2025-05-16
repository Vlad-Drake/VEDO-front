import Circle from './assets/circle.svg';
import classes from './buttonKit.module.scss';

export const BTN_STATUSES = {
    Default: 'default',
    Disabled: 'disabled',
    Loading: 'loading',
} as const;

export type BtnStatuses = typeof BTN_STATUSES[keyof typeof BTN_STATUSES];

export const BTN_TYPES = {
    Primary: 'primary',
    Additional: 'additional',
    Secondary: 'secondary',
    Outline: 'outline',
    Soft: 'soft',
    Mb: 'mb',
    Sber: 'sber',
} as const;

export type BtnTypes = typeof BTN_TYPES[keyof typeof BTN_TYPES];

type ButtonType = "button" | "submit" | "reset";

export function ButtonKit({
    btnContent,
    btnStatus,
    btnClick,
    btnWidth,
    type = 'button',
    btnType,
}:{
    btnContent: React.ReactNode,
    btnStatus: BtnStatuses,
    btnClick: () => void,
    btnWidth?: string,
    type?: ButtonType,
    btnType: BtnTypes,
}) {

    const handleClick = () => {
        if(btnStatus !== 'default') return;
        btnClick();
    }

    return (
        <button 
            className={`${classes["button"]} ${classes[`${btnType}${btnStatus !== BTN_STATUSES.Default ? '-'+btnStatus : ''}`]}`} 
            style={{ width: btnWidth }} 
            onClick={handleClick}
            type={type}
        >
            <span className={btnStatus === BTN_STATUSES.Loading ? classes['invisible'] : ''}>{btnContent}</span>
            {
                btnStatus === BTN_STATUSES.Loading
                ? 
                (<div className={classes['loader']}>
                    <img src={Circle} alt="" />
                </div>)
                : ''
            }
        </button>
    );
}
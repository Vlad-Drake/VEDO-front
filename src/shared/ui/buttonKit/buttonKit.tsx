import Circle from './assets/circle.svg';
import classes from './buttonKit.module.scss';

export const BTN_STATUSES = {
    Default: 'default',
    Disabled: 'disabled',
    Loading: 'loading',
} as const;

export type BtnStatuses = typeof BTN_STATUSES[keyof typeof BTN_STATUSES];

export function ButtonKit({
    btnContent,
    btnStatus,
    btnClick,
    btnWidth,
}:{
    btnContent: React.ReactNode,
    btnStatus: BtnStatuses,
    btnClick: () => void,
    btnWidth?: string,
}) {

    const handleClick = () => {
        btnClick();
    }

    return (
        <button className={classes["button"]} style={{ width: btnWidth }} onClick={handleClick}>
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